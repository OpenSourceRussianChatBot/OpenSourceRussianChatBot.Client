import React, { useEffect, useRef, useLayoutEffect } from 'react';

import './Chat.scss';

import { call } from '~utils/call';
import { useModel } from '~utils/useModel';
import { Message } from '~components/Message/Message';
import { Loading } from '~components/Loading/Loading';
import { MessageForm } from '~components/MessageForm/MessageForm';
import { ChatModel } from './Chat.model';

export const Chat: React.FC = () => {
	const scrollerRef = useRef<HTMLDivElement>();
	const model = useModel(ChatModel, scrollerRef);

	useEffect(() => {
		call(async () => {
			await model.loadMessages();
			if (scrollerRef.current) {
				scrollerRef.current.scrollTop = scrollerRef.current?.scrollHeight;
			}
		});
	}, [model]);

	useLayoutEffect(() => {
		model.onViewUpdate();
	});

	if (model.state.preloading) {
		return (
			<div className="Chat">
				<Loading />
			</div>
		);
	}

	const $messages = model.state.messages.map(message => <Message key={message.id} message={message}></Message>);
	const $loading = !model.state.loading ? null : (
		<div className="Chat__Loading">
			<Loading size="s" />
		</div>
	);

	return (
		<div className="Chat">
			<div className="Chat__Messages">
				<div ref={scrollerRef as any} className="Chat__Messages-scroller">
					{$messages}
					{$loading}
				</div>
			</div>
			<MessageForm onMessage={model.onMessage} />
		</div>
	);
};
