import chalk from "chalk";
import moment from "moment";
import { v1 as uuid } from "uuid";
import { createNamespace, Namespace } from "./context";

export type Option = {
	allowCover: Boolean
}

export type Format = (...values: any) => string;

export class Logger {
	private format: {
		withUID: Format
		withoutUID: Format
	};
	private NameSpace: Namespace;
	constructor(namespace: string, format?: {
		withUID: Format
		withoutUID: Format
	}) {
		this.NameSpace = createNamespace(namespace);
		this.format = {
			withUID: format?.withUID ?? Logger.template`[${0} ${1} ${2}]`,
			withoutUID: format?.withoutUID ?? Logger.template`[${0} ${1}]`,
		};
	}

	static template(strings: TemplateStringsArray, ...keys: number[]): Format {
		return (function (...values: any) {
			var result = [strings[0]];
			keys.forEach(function (key, i) {
				var value = values[key];
				result.push(value, strings[i + 1]);
			});
			return result.join('');
		});
	}

	getUID() {
		if (!this.NameSpace.context) {
			return undefined;
		}
		return this.NameSpace.context.get("tid");
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
		const day = now.format("YYYY-MM-DD");
		const time = now.format("HH:mm:ss");
		const uid = this.NameSpace.context?.get("tid");
		const str = this.NameSpace.context ? this.format.withUID(uid, day, time) : this.format.withoutUID(day, time);
		console.log(
			chalk.yellow(str),
			...args
		);
	}

	success(...args: any[]) {
		const now = moment();
		const day = now.format("YYYY-MM-DD");
		const time = now.format("HH:mm:ss");
		const uid = this.NameSpace.context?.get("tid");
		const str = this.NameSpace.context ? this.format.withUID(uid, day, time) : this.format.withoutUID(day, time);
		console.log(
			chalk.green(str),
			...args
		);
	}

	error(...args: any[]) {
		const now = moment();
		const day = now.format("YYYY-MM-DD");
		const time = now.format("HH:mm:ss");
		const uid = this.NameSpace.context?.get("tid");
		const str = this.NameSpace.context ? this.format.withUID(uid, day, time) : this.format.withoutUID(day, time);
		console.log(
			chalk.red(str),
			...args
		);
	}
}
