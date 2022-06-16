import "reflect-metadata";
import { Test, Expect, TestFixture, Timeout, SetupFixture,Focus } from "alsatian";
import { Logger } from "../lib";

@TestFixture('Logger Test')
export class LoggerTest {
    i1: Logger
    i2: Logger

    @SetupFixture
    init() {
        this.i1 = new Logger("1");
        this.i2 = new Logger("2", { withUID: Logger.template`${0}${1}${2}`, withoutUID: Logger.template`|${0} ${1}|` });
        const fn = console.log;
        console.log = (...args) => {
            fn(...args);
            return args;
        }
    }

    @Test(`default output should work`)
    @Timeout(10000)
    public async default() {
        const text = "test";
        const start = `\x1B[33m`;
        const end = `\x1B[39m`;
        const out = this.i1.info(text);
        const date = out[0].split(start)[1].split(end)[0].split("");
        const flag_end = date.pop();
        const flag_start = date.shift();
        Expect(/^(\d{4})-(\d{2})-(\d{2})/.test(date.join(""))).toEqual(true);
        Expect(`${text}`).toEqual(out[1]);
        Expect(flag_start).toEqual('[');
        Expect(flag_end).toEqual(']');
    }

    @Test(`custom output should work`)
    @Timeout(10000)
    public async custom() {
        const text = "test";
        const start = `\x1B[33m`;
        const end = `\x1B[39m`;
        const out = this.i2.info(text);
        const date = out[0].split(start)[1].split(end)[0].split("");
        const flag_end = date.pop();
        const flag_start = date.shift();
        Expect(/^(\d{4})-(\d{2})-(\d{2})/.test(date.join(""))).toEqual(true);
        Expect(`${text}`).toEqual(out[1]);
        Expect(flag_start).toEqual('|');
        Expect(flag_end).toEqual('|');
    }

    @Test(`error output should work`)
    @Timeout(10000)
    public async error_default() {
        const text = "test";
        const start = `\x1B[31m`;
        const end = `\x1B[39m`;
        const out = this.i1.error(text);
        const date = out[0].split(start)[1].split(end)[0].split("");
        const flag_end = date.pop();
        const flag_start = date.shift();
        Expect(/^(\d{4})-(\d{2})-(\d{2})/.test(date.join(""))).toEqual(true);
        Expect(`${text}`).toEqual(out[1]);
        Expect(flag_start).toEqual('[');
        Expect(flag_end).toEqual(']');
    }

    @Test(`custom error output should work`)
    @Timeout(10000)
    public async error_custom() {
        const text = "test";
        const start = `\x1B[31m`;
        const end = `\x1B[39m`;
        const out = this.i2.error(text);
        const date = out[0].split(start)[1].split(end)[0].split("");
        const flag_end = date.pop();
        const flag_start = date.shift();
        Expect(/^(\d{4})-(\d{2})-(\d{2})/.test(date.join(""))).toEqual(true);
        Expect(`${text}`).toEqual(out[1]);
        Expect(flag_start).toEqual('|');
        Expect(flag_end).toEqual('|');
    }

    @Test(`success output should work`)
    @Timeout(10000)
    public async success_default() {
        const text = "test";
        const start = `\x1B[32m`;
        const end = `\x1B[39m`;
        const out = this.i1.success(text);
        const date = out[0].split(start)[1].split(end)[0].split("");
        const flag_end = date.pop();
        const flag_start = date.shift();
        Expect(/^(\d{4})-(\d{2})-(\d{2})/.test(date.join(""))).toEqual(true);
        Expect(`${text}`).toEqual(out[1]);
        Expect(flag_start).toEqual('[');
        Expect(flag_end).toEqual(']');
    }

    @Test(`custom success output should work`)
    @Timeout(10000)
    public async success_custom() {
        const text = "test";
        const start = `\x1B[32m`;
        const end = `\x1B[39m`;
        const out = this.i2.success(text);
        const date = out[0].split(start)[1].split(end)[0].split("");
        const flag_end = date.pop();
        const flag_start = date.shift();
        Expect(/^(\d{4})-(\d{2})-(\d{2})/.test(date.join(""))).toEqual(true);
        Expect(`${text}`).toEqual(out[1]);
        Expect(flag_start).toEqual('|');
        Expect(flag_end).toEqual('|');
    }
}

