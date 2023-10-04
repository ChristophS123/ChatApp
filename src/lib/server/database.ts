// In a real app, this data would live in a database,
// rather than in memory. But for now, we cheat.

export type Chat = {
	id: string;
	name: string;
	userIDs:string[];
	messages:string[];
	senders:string[];
};

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

export function createChat(userIDs:string[]) {
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
