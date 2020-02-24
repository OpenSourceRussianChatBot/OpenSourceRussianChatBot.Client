export class EventEmitter {
	protected _listeners: IEventEmitterListener[] = [];
	public get listeners() {
		return this._listeners;
	}

	public on(eventName: IEventEmitterListener['eventName'], handler: IEventEmitterListener['handler'], isOne = false) {
		this._listeners.push({
			eventName,
			handler,
			isOne,
		});
		return {
			remove: () => {
				this.off(eventName, handler);
			},
		};
	}
	public one(eventName: IEventEmitterListener['eventName'], handler: IEventEmitterListener['handler']) {
		return this.on(eventName, handler, true);
	}
	public off(eventName: IEventEmitterListener['eventName'], handler: IEventEmitterListener['handler']) {
		this._listeners = this._listeners.filter(
			listener => !(listener.eventName === eventName && listener.handler === handler),
		);
	}
	public emit(eventName: string) {
		const listeners = [...this._listeners];
		for (const listener of listeners) {
			if (listener.eventName !== eventName) continue;
			listener.handler();
			if (listener.isOne) {
				this.off(listener.eventName, listener.handler);
			}
		}
	}
}

export interface IEventEmitterListener {
	eventName: string;
	handler: () => void;
	isOne?: boolean;
}
