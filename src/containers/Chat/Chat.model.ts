import { BaseModel } from '~utils/BaseModel';
import { delay } from '~utils/delay';
import { IMessage } from '~components/Message/Message.interfaces';
import { MutableRefObject } from 'react';

export class ChatModel extends BaseModel<IChatModelState> {
	public state: IChatModelState = {
		preloading: true,
		loading: true,
		messages: [],
	};
	protected scrollToBottom = false;

	constructor(protected scrollerRef: MutableRefObject<HTMLDivElement | undefined>) {
		super();
	}

	public async loadMessages() {
		await delay(2000);
		const messages: IMessage[] = [];
		for (let i = 0; i < 10; i++) {
			messages.push({
				id: i.toString(),
				author: i % 2 ? 'bot' : 'user',
				text: 'Test',
			});
		}
		this.updateState({
			preloading: false,
			loading: false,
			messages,
		});
	}
	public addMessage(message: IMessage) {
		this.updateState({
			messages: [...this.state.messages, message],
		});
		this.scrollToBottom = true;
	}
	public onViewUpdate() {
		if (this.scrollToBottom && this.scrollerRef.current) {
			this.scrollerRef.current.scrollTop = this.scrollerRef.current.scrollHeight;
		}
	}
	public onMessage = async (message: string) => {
		if (!message.trim()) return;
		this.addMessage({
			id: Date.now().toString(),
			author: 'user',
			text: message,
		});
		this.updateState({
			loading: true,
		});
		await delay(500);
		this.updateState({
			loading: false,
		});
		this.addMessage({
			id: Date.now().toString(),
			author: 'bot',
			text: message
				.split('')
				.reverse()
				.join(''),
		});
	};
}

export interface IChatModelState {
	preloading: boolean;
	loading: boolean;
	messages: IMessage[];
}
