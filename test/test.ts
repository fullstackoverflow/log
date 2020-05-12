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
        this.i2 = new Logger("2", { withUID: Logger.template`${0}${1}${2}`, withoutUID: Logger.template`${0}${1}` });
        console.log = (...args) => {
            return args;
        }
    }

    @Test(`default output should work`)
    @Timeout(10000)
    public async default() {
        const out = this.i1.info("test");
        console.warn(out);
        const output = out[0].split("\u001b[33m[")[1].split("]\u001b[39m")[0];
        Expect(/^(\d{4})-(\d{2})-(\d{2})/.test(output)).toEqual(true);
    }

    @Test(`custom output should work`)
    @Timeout(10000)
    public async custom() {
        const out = this.i2.info("test");
        const output = out[0].split("\u001b[33m")[1].split("\u001b[39m")[0];
        Expect(/^(\d{4})-(\d{2})-(\d{2})/.test(output)).toEqual(true);
    }
}

