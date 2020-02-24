import React from 'react';

import './App.scss';

import { Chat } from '~containers/Chat/Chat';

export const App: React.FC = () => {
	return (
		<div className="App">
			<Chat />
		</div>
	);
};
