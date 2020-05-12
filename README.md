![CI](https://github.com/fullstackoverflow/log/workflows/Test/badge.svg)
[![codecov](https://codecov.io/gh/fullstackoverflow/log/branch/master/graph/badge.svg)](https://codecov.io/gh/fullstackoverflow/log)
[![NPM version](https://img.shields.io/npm/v/@tosee/log.svg)](https://www.npmjs.com/@tosee/log)

# 快速开始

```logger.Middleware()```后的中间件里的logger打印都会带上该请求的唯一ID

```
import { Logger } from "@tosee/log"
import koa from 'koa';
const logger = new Logger('my namespace');

const app = new koa();

app.use(logger.Middleware());

app.use(async (ctx) => {
    logger.info("test");
});

app.listen(3000);

```
output
```
[7831cef0-940c-11ea-ba2e-83ad967e8b38 2020-05-12 12:53:06]  GET /
[7831cef0-940c-11ea-ba2e-83ad967e8b38 2020-05-12 12:53:06]  test
```

自定义
```
import { Logger } from "@tosee/log"
import koa from 'koa';
const logger = new Logger('my namespace',{
    withUID:Logger.templete`[${0}] [${1}] [${2}]`,
    withoutUID:Logger.templete`[${0}] [${1}]`,
});

const app = new koa();

app.use(logger.Middleware());

app.use(async (ctx) => {
    logger.info("test");
});

app.listen(3000);

```
output
```
[7831cef0-940c-11ea-ba2e-83ad967e8b38] [2020-05-12] [12:53:06]  GET /
[7831cef0-940c-11ea-ba2e-83ad967e8b38] [2020-05-12] [12:53:06]  test
```