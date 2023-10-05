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
	chatIDs:string
}

const db = new Map();

export async function getChats(userID:string) : Promise<Chat[]> {
	let user:User = await getUserByID((userID))
	let chatIDs:string[] = user.chatIDs.split(",");
	let chats:Chat[] = [];
	for await (const element of chatIDs) {
		chats.push(await getChatByID(element))
	}
	return chats;
}

export async function createChat(name:string[]) {
	
}

export function deleteTodo(chatID:string) {
	// TODO: Not yet implemented
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
	let username = (await getUserByID((await supabase.auth.getUser()).data.user?.id.toString()!)).name;
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
	let userID = (await supabase.auth.getUser()).data.user?.id;
	const { data, error } = await supabase.from('invitations').select('*').eq('reciverID', userID);
	if(error || data == null)
		throw new Error("Fehler beim Laden der Einladungen")
	return data;
}

export function acceptInvitation(userID:string, clanID:string) {
	
}

export async function signUp(email:string, password:string, name:string) {
	try {
		const { data } = await supabase.auth.signUp({
			email,
			password
		});
		if(data.user == null)
			throw new Error("Fehler beim registrieren.")
		await createUserInDatabase(name, data.user.id)
	} catch (e) {
		throw new Error("Fehler beim registrieren");
	}
	
}

export async function createUserInDatabase(name:string, userID:string) {
	let tableUser:User = {
		id: userID,
		name: name,
		chatIDs: ""
	}
 	const { error } = await supabase.from('users').insert(tableUser);
	if(error)
		throw new Error("Fehler beim registrieren");
}

export async function automaticSignIn() : Promise<boolean> {
	return await supabase.auth.getUser() != null
}

export async function getUserByID(id:string) : Promise<User> {
	const { data, error } = await supabase.from('users').select('*').eq("id", id);
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
		return null
	}
}


