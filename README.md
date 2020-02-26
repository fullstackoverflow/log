[![Build Status](https://www.travis-ci.org/fullstackoverflow/log.svg?branch=master)](https://www.travis-ci.org/fullstackoverflow/log.svg?branch=master)
[![codecov](https://codecov.io/gh/fullstackoverflow/log/branch/master/graph/badge.svg)](https://codecov.io/gh/fullstackoverflow/log)
[![NPM version](https://img.shields.io/npm/v/@tosee/log.svg)](https://www.npmjs.com/@tosee/log)

# 快速开始

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
