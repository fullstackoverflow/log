export declare type Option = {
    allowCover: Boolean;
};
export declare class Logger {
    private NameSpace;
    constructor(namespace: string, format?: string);
    Middleware(option?: Option): (ctx: any, next: Function) => Promise<void>;
    info(...args: any[]): void;
    success(...args: any[]): void;
    error(...args: any[]): void;
}
