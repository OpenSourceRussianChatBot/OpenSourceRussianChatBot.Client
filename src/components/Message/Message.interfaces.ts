export interface IMessage {
	id: string;
	author: 'user' | 'bot';
	text: string;
}
