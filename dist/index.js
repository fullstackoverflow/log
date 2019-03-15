"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const moment_1 = __importDefault(require("moment"));
const uuid_1 = require("uuid");
const context_1 = require("./context");
class Logger {
    constructor(namespace) {
        this.NameSpace = context_1.createNamespace(namespace);
    }
    Middleware() {
        const namespace = this.NameSpace;
        return async function (ctx, next) {
            namespace.init();
            const tid = uuid_1.v1();
            ctx.response.set("X-Request-ID", tid);
            namespace.context.set("tid", tid);
            await next();
        };
    }
    info(...args) {
        if (!this.NameSpace.context) {
            console.log(chalk_1.default.yellow(`[${moment_1.default().format("YYYY-MM-DD")}] [${moment_1.default().format("HH:mm:ss")}] `), ...args);
        }
        else {
            console.log(chalk_1.default.yellow(`[${this.NameSpace.context.get("tid")}] [${moment_1.default().format("YYYY-MM-DD")}] [${moment_1.default().format("HH:mm:ss")}] `), ...args);
        }
    }
    success(...args) {
        if (!this.NameSpace.context) {
            console.log(chalk_1.default.green(`[${moment_1.default().format("YYYY-MM-DD")}] [${moment_1.default().format("HH:mm:ss")}] `), ...args);
        }
        else {
            console.log(chalk_1.default.green(`[${this.NameSpace.context.get("tid")}] [${moment_1.default().format("YYYY-MM-DD")}] [${moment_1.default().format("HH:mm:ss")}] `), ...args);
        }
    }
    error(...args) {
        if (!this.NameSpace.context) {
            console.log(chalk_1.default.red(`[${moment_1.default().format("YYYY-MM-DD")}] [${moment_1.default().format("HH:mm:ss")}] `), ...args);
        }
        else {
            console.log(chalk_1.default.red(`[${this.NameSpace.context.get("tid")}] [${moment_1.default().format("YYYY-MM-DD")}] [${moment_1.default().format("HH:mm:ss")}] `), ...args);
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=index.js.map