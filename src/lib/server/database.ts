// In a real app, this data would live in a database,
// rather than in memory. But for now, we cheat.

import { supabase } from "$lib/supabaseClient";
import { randomUUID, type UUID } from "crypto";

export type Chat = {
	id: string;
	name: string;
};

export type Message = {
	id:string;
	message:string,
	sender:string,
	created:string,
	chatID:string
}

export type Invitation = {
	id:string,
	reciverID:string,
	chatID:string,
	chatName:string
}

export type User = {
	id:string,
	name:string,
	chatIDs:string,
	email:string
}

const db = new Map();

export async function getChats(userID:string) : Promise<Chat[]> {
	let user:User = await getUserByID((userID))
	if(user.chatIDs == "") {
		return [];
	}
	let chatIDs:string[] = user.chatIDs.split(",");
	let chats:Chat[] = [];
	for await (const element of chatIDs) {
		chats.push(await getChatByID(element))
	}
	return chats;
}

export async function createChat(name:string) {
	let id:string = randomUUID();
	let chat:Chat = {
		id: id,
		name: name
	}
	await supabase.from('chats').insert(chat);
	let creatorID:string = ((await supabase.auth.getSession()).data.session?.user.id!).toString()!;
	await addUserToChat(creatorID, id);
}

export async function addUserToChat(userID:string, chatID:string) {
	const data:any = await supabase.from('users').select('chatIDs').eq('id', userID);
	let chatIDs = data.data[0].chatIDs;
	if(chatIDs == "") {
		chatIDs = chatID;
	} else {
		chatIDs += "," + chatID;
	}
	let updatedData = {
		chatIDs: chatIDs
	}
	await supabase.from('users').update(updatedData).eq('id', userID);
}

export async function getChatByID(chatID:string) : Promise<Chat> {
	const { data, error } = await supabase.from('chats').select('*').eq("id", chatID);
	if(data == null)
		throw new Error("fehler")
	return data[0];
}

export async function getMessagesByChat(chatID:string) : Promise<Message[]> {
	const { data, error } = await supabase.from('messages').select('*').eq('chatID', chatID);
	if(error)
		console.log(error.message);
	if(data == null)
		return [];
	return data;
}

export async function sendMessage(chatID:string, message:string) {
	console.log(message + " MSG")
	let username = (await getUserByID(((await supabase.auth.getSession()).data.session?.user.id!).toString()!)).name;
	console.log(username)
	let msgModel:Message = {
		id: randomUUID(),
		message: message,
		sender: username,
		created: Date.now().toString(),
		chatID: chatID
	}
	await supabase.from('messages').insert(msgModel);
}

export async function loadInvitationFromUser() : Promise<Invitation[]> {
	let userID = (await supabase.auth.getSession()).data.session?.user.id;
	const { data, error } = await supabase.from('invitations').select('*').eq('reciverID', userID);
	if(error || data == null)
		throw new Error("Fehler beim Laden der Einladungen")
	return data;
}

export async function acceptInvitation(invitationID:string) {
	let invitation:Invitation = await getInvitationByID(invitationID);
	await addUserToChat(invitation.reciverID, invitation.chatID);
	await supabase.from('invitations').delete().eq('id', invitation.id);
}

export async function getInvitationByID(invitationID:string) : Promise<Invitation> {
	const { data, error } = await supabase.from('invitations').select('*').eq("id", invitationID);
	if(error || data == null) {
		throw new Error("Error beim Laden des Users")
	}
	return data[0];
}

export async function denyInvitation(invitationID:string) {
	let invitation:Invitation = await getInvitationByID(invitationID);
	await supabase.from('invitations').delete().eq('id', invitation.id);
}

export async function signUp(email:string, password:string, name:string) {
	try {
		const { data } = await supabase.auth.signUp({
			email,
			password
		});
		if(data.user == null)
			throw new Error("Fehler beim registrieren.")
		await createUserInDatabase(name, data.user.id, email)
	} catch (e) {
		throw new Error("Fehler beim registrieren");
	}
}

export async function createUserInDatabase(name:string, userID:string, email:string) {
	let tableUser:User = {
		id: userID,
		name: name,
		chatIDs: "",
		email: email
	}
 	const { error } = await supabase.from('users').insert(tableUser);
	if(error)
		throw new Error("Fehler beim registrieren");
	addUserToChat(userID, 'd1591013-d52b-4d2d-8411-b62b1a7eb2ba'); // Add to public chat
}

export async function automaticSignIn() : Promise<boolean> {
	return await supabase.auth.getSession() != null
}

export async function getUserByID(id:string) : Promise<User> {
	const { data, error } = await supabase.from('users').select('*').eq("id", id);
	if(error || data == null) {
		throw new Error("Error beim Laden des Users")
	}
	return data[0];
}

export async function getUserByEmail(email:string) : Promise<User> {
	const { data, error } = await supabase.from('users').select('*').eq("email", email);
	if(error || data == null) {
		throw new Error("Error beim Laden des Users")
	}
	return data[0];
}

export async function signIn(data:any) {
	try {
		const user = await supabase.auth.signInWithPassword({
			email: data.get("email"),
			password: data.get("password")
		});
		return user;
	} catch(e) {
		console.log("Error: " + e)
		return null
	}
}

export async function sendInvitation(reciverEmail:string, chatID:string) {
	let chatName = (await getChatByID(chatID)).name;
	let reciverID = (await getUserByEmail(reciverEmail)).id;
	let invitation:Invitation = {
		id: randomUUID(),
		reciverID: reciverID,
		chatID: chatID,
		chatName: chatName
	};
	await supabase.from('invitations').insert(invitation);
}

export async function leaveChat(chatID:string) {
	let user:User = await getUserByID(((await supabase.auth.getSession()).data.session?.user.id!));
	let chatIDs:string[] = user.chatIDs.split(",");
	for(let i = 0; i < chatIDs.length; i++) {
		if(chatIDs[i] == chatID)
			chatIDs.splice(i, 1);
	}
	let newChatIDs = "";
	chatIDs.forEach(element => {
		if(newChatIDs == "") {
			newChatIDs += element;
		} else {
			newChatIDs += "," + element;
		}
	});
	let updatedData = {
		chatIDs: newChatIDs
	}
	await supabase.from('users').update(updatedData).eq('id', user.id);
}

export async function getUsername() : Promise<string> {
	let userID = ((await supabase.auth.getSession()).data.session?.user.id!);
	return (await getUserByID(userID)).name;
}

export async function guestSignIn(name:string) {
	let email:string = randomUUID() + "@mail.com";
	let password:string = randomUUID();
	signUp(email, password, name);
	signIn({
		email: email,
		password: password
	});
}