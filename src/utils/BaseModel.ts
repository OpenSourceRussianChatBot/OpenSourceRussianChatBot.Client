import { EventEmitter } from './EventEmitter';
import { NonStrict } from './NonStrict';

export abstract class BaseModel<TState> extends EventEmitter {
	protected _listeners = [];
	public abstract state: TState;

	public setState(state: TState) {
		this.state = state;
		this.emit('change');
	}
	public updateState(state: NonStrict<TState>) {
		this.setState({
			...this.state,
			...state,
		});
	}
}
