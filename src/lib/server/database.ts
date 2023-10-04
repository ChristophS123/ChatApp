// In a real app, this data would live in a database,
// rather than in memory. But for now, we cheat.

export type Chat = {
	id: string;
	name: string;
	userIDs:string[];
	messages:string[];
	senders:string[];
};

export type Message = {
	id:string;
	message:string,
	sender:string,
	date:string
}

export type Invitation = {
	id:string,
	email:string,
	chat:string,
	chatName:string
}

const db = new Map();

export function getChats(userid: string) : Chat[] {
	let chats = [
		{
			id: "iaosias",
			name: "TestChat",
			userIDs: ["asas", "asfadf"],
			messages: ["Du bist doof", "Gar nicht"],
			senders: ["Hubert", "Jürgen"]
		},
		{
			id: "iaosiasasas",
			name: "Bester Chat",
			userIDs: ["aasasasas", "assasafdsfadf"],
			messages: ["Du bist nicht doof", "doch"],
			senders: ["Karina", "Peter"]
		}
	];
	return chats;
}

export function createChat(name:string[]) {
	// TODO: Not yet implemented
}

export function deleteTodo(chatID:string) {
	// TODO: Not yet implemented
}

export function getChatByID(chatID:string) : Chat {
	return {
		id: chatID,
		name: "Cooler Chat",
		userIDs: ["sas", "dsdf"],
		messages: ["Du bist nicht doof", "doch"],
		senders: ["Karina", "Peter"]
	};
}

export function getMessagesByChat(chatID:string) : Message[] {
	return [
		{
			id: "asasas",
			message: "Du bist doof",
			sender: "Username",
			date: Date.now().toLocaleString()
		},
		{
			id: "asasadsfa",
			message: "Du bist doof",
			sender: "Username",
			date: Date.now().toString()
		}
	]
}

export function sendMessage(chatID:string, message:string) {
	// TODO: Not yet implemented
}

export function loadInvitationFromUser() : Invitation[] {
	return [
		{
			id: "asigas",
			email: "email",
			chat: "asasqas",
			chatName: "CoolerName"
		}
	];
}

export function acceptInvitation(userID:string, clanID:string) {
	
}



