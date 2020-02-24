import { BaseModel } from './BaseModel';
import { useState, useEffect } from 'react';

export function useModel<TModel extends BaseModel<any>, TArgs extends any[]>(
	Model: new (...args: TArgs) => TModel,
	...args: TArgs
) {
	const [model] = useState(() => {
		return new Model(...args);
	});
	const [, setState] = useState(model.state);

	useEffect(() => {
		const listener = model.on('change', () => {
			setState(model.state);
		});
		return () => {
			listener.remove();
		};
	});

	return model;
}
