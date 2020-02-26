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
    constructor(namespace, option) {
        this.NameSpace = context_1.createNamespace(namespace);
        this.option = option;
    }
    Middleware() {
        const namespace = this.NameSpace;
        const option = this.option;
        return async function (ctx, next) {
            var _a;
            namespace.init();
            let tid = uuid_1.v1();
            if (option === null || option === void 0 ? void 0 : option.allowCover) {
                tid = (_a = ctx.request.get("X-Request-ID")) !== null && _a !== void 0 ? _a : tid;
            }
            ctx.response.set("X-Request-ID", tid);
            namespace.context.set("tid", tid);
            await next();
        };
    }
    info(...args) {
        const now = moment_1.default();
        if (!this.NameSpace.context) {
            console.log(chalk_1.default.yellow(`[${now.format("YYYY-MM-DD")}] [${now.format("HH:mm:ss")}] `), ...args);
        }
        else {
            console.log(chalk_1.default.yellow(`[${this.NameSpace.context.get("tid")}] [${now.format("YYYY-MM-DD")}] [${now.format("HH:mm:ss")}] `), ...args);
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