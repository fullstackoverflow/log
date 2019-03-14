export declare class Namespace {
    ContextManager: Map<number, Map<string, any>>;
    constructor();
    init(): void;
    readonly context: Map<string, any>;
}
export declare function createNamespace(name: string): Namespace;
export declare function getNamespace(name: string): Namespace;
