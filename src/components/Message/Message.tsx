import React from 'react';
import { IMessage } from './Message.interfaces';

import './Message.scss';

export const Message: React.FC<IMessageProps> = ({ message }: IMessageProps) => {
	return <div className={`Message Message_${message.author}`}>{message.text}</div>;
};

interface IMessageProps {
	message: IMessage;
}
