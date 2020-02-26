import Koa from "koa";
export declare type Option = {
    allowCover: Boolean;
};
export declare class Logger {
    private NameSpace;
    private option;
    constructor(namespace: string, option?: Option);
    Middleware(): (ctx: Koa.Context, next: Function) => Promise<void>;
    info(...args: any[]): void;
    success(...args: any[]): void;
    error(...args: any[]): void;
}
