import chalk from "chalk";
import moment from "moment";
import { v1 as uuid } from "uuid";
import { createNamespace, Namespace } from "./context";

export type Option = {
	allowCover: Boolean
}

export class Logger {
	private NameSpace: Namespace;
	constructor(namespace: string, format?: string) {
		this.NameSpace = createNamespace(namespace);
	}

	Middleware(option?: Option) {
		const namespace = this.NameSpace;
		return async function (ctx, next: Function) {
			namespace.init();
			let tid = uuid();
			if (option?.allowCover) {
				tid = ctx.request.get("X-Request-ID") || tid;
			}
			ctx.response.set("X-Request-ID", tid);
			namespace.context.set("tid", tid);
			await next();
		};
	}

	info(...args: any[]) {
		const now = moment();
		if (!this.NameSpace.context) {
			console.log(chalk.yellow(`[${now.format("YYYY-MM-DD")} ${now.format("HH:mm:ss")}] `), ...args);
		} else {
			console.log(
				chalk.yellow(`[${this.NameSpace.context.get("tid")} ${now.format("YYYY-MM-DD")}] [${now.format("HH:mm:ss")}] `),
				...args
			);
		}
	}

	success(...args: any[]) {
		if (!this.NameSpace.context) {
			console.log(chalk.green(`[${moment().format("YYYY-MM-DD")} ${moment().format("HH:mm:ss")}] `), ...args);
		} else {
			console.log(
				chalk.green(`[${this.NameSpace.context.get("tid")} ${moment().format("YYYY-MM-DD")}] [${moment().format("HH:mm:ss")}] `),
				...args
			);
		}
	}

	error(...args: any[]) {
		if (!this.NameSpace.context) {
			console.log(chalk.red(`[${moment().format("YYYY-MM-DD")} ${moment().format("HH:mm:ss")}] `), ...args);
		} else {
			console.log(
				chalk.red(`[${this.NameSpace.context.get("tid")} ${moment().format("YYYY-MM-DD")}] [${moment().format("HH:mm:ss")}] `),
				...args
			);
		}
	}
}
