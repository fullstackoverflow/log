import "reflect-metadata";
import { Test, Expect, TestFixture, Timeout, SetupFixture } from "alsatian";
import { Logger } from "../lib";

@TestFixture('Logger Test')
export class LoggerTest {
    i1: Logger
    i2: Logger

    @SetupFixture
    init() {
        this.i1 = new Logger("1");
        this.i2 = new Logger("2", { withUID: Logger.template`${0}${1}${2}`, withoutUID: Logger.template`|${0} ${1}|` });
        console.log = (...args) => {
            return args;
        }
    }

    @Test(`default output should work`)
    @Timeout(10000)
    public async default() {
        const out = this.i1.info("test");
        const output = ((out as any)[0]).split("");
        const f1 = (output as any).shift();
        const f2 = (output as any).pop();
        Expect(/^(\d{4})-(\d{2})-(\d{2})/.test(output.join(""))).toEqual(true);
        Expect(out[1]).toEqual("test");
        Expect(f1).toEqual("[");
        Expect(f2).toEqual("]");
    }

    @Test(`custom output should work`)
    @Timeout(10000)
    public async custom() {
        const out = this.i2.info("test");
        const output = ((out as any)[0]).split("");
        const f1 = (output as any).shift();
        const f2 = (output as any).pop();
        Expect(/^(\d{4})-(\d{2})-(\d{2})/.test(output.join(""))).toEqual(true);
        Expect(out[1]).toEqual("test");
        Expect(f1).toEqual("|");
        Expect(f2).toEqual("|");
    }

    @Test(`error output should work`)
    @Timeout(10000)
    public async error_default() {
        const out = this.i1.error("test");
        const output = ((out as any)[0]).split("");
        const f1 = (output as any).shift();
        const f2 = (output as any).pop();
        Expect(/^(\d{4})-(\d{2})-(\d{2})/.test(output.join(""))).toEqual(true);
        Expect(out[1]).toEqual("test");
        Expect(f1).toEqual("[");
        Expect(f2).toEqual("]");
    }

    @Test(`custom error output should work`)
    @Timeout(10000)
    public async error_custom() {
        const out = this.i2.error("test");
        const output = ((out as any)[0]).split("");
        const f1 = (output as any).shift();
        const f2 = (output as any).pop();
        Expect(/^(\d{4})-(\d{2})-(\d{2})/.test(output.join(""))).toEqual(true);
        Expect(out[1]).toEqual("test");
        Expect(f1).toEqual("|");
        Expect(f2).toEqual("|");
    }

    @Test(`success output should work`)
    @Timeout(10000)
    public async success_default() {
        const out = this.i1.success("test");
        const output = ((out as any)[0]).split("");
        const f1 = (output as any).shift();
        const f2 = (output as any).pop();
        Expect(/^(\d{4})-(\d{2})-(\d{2})/.test(output.join(""))).toEqual(true);
        Expect(out[1]).toEqual("test");
        Expect(f1).toEqual("[");
        Expect(f2).toEqual("]");
    }

    @Test(`custom success output should work`)
    @Timeout(10000)
    public async success_custom() {
        const out = this.i2.success("test");
        const output = ((out as any)[0]).split("");
        const f1 = (output as any).shift();
        const f2 = (output as any).pop();
        Expect(/^(\d{4})-(\d{2})-(\d{2})/.test(output.join(""))).toEqual(true);
        Expect(out[1]).toEqual("test");
        Expect(f1).toEqual("|");
        Expect(f2).toEqual("|");
    }
}

