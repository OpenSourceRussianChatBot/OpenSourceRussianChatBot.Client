import React, { FormEvent, useState } from 'react';

import './MessageForm.scss';

export const MessageForm: React.FC<IMessageFormProps> = ({ onMessage }: IMessageFormProps) => {
	const [value, setValue] = useState('');

	return (
		<form className="MessageForm" onSubmit={onSubmit}>
			<input type="text" className="MessageForm__Input" placeholder="Сообщение" value={value} onInput={onInput} />
			<button type="submit" className="MessageForm__Submit"></button>
		</form>
	);

	function onInput(event: React.FormEvent<HTMLInputElement>) {
		setValue((event.target as HTMLInputElement).value);
	}
	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		onMessage(value);
		setValue('');
		return false;
	}
};

interface IMessageFormProps {
	onMessage: (message: string) => void;
}
