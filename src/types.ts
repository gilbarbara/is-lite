export type Class<T = unknown> = new (...arguments_: any[]) => T;
export type PlainObject = Record<number | string | symbol, unknown>;

export type Primitive = null | undefined | string | number | boolean | symbol | bigint;
