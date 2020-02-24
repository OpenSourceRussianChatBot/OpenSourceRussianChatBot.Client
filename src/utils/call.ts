export function call<TArgs extends any[], TResult>(fn: (...args: TArgs) => TResult, ...args: TArgs): TResult {
	return fn(...args);
}
