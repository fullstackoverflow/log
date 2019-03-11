import Koa from "koa";
export declare class Logger {
    private NameSpace;
    constructor(namespace: string);
    Middleware(): (ctx: Koa.Context, next: Function) => Promise<void>;
    info(...args: any[]): void;
    success(...args: any[]): void;
    error(...args: any[]): void;
}
