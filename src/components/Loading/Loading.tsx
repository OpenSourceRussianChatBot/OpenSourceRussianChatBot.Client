import React from 'react';

import './Loading.scss';

export const Loading: React.FC<ILoadingProps> = ({ size }: ILoadingProps) => {
	return (
		<div className={`Loading Loading_${size || 'm'}`}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

interface ILoadingProps {
	size?: 's' | 'm' | 'l' | 'xl';
}
