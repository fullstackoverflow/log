import Koa from 'koa';
import {Logger} from '../lib/index'

const app = new Koa();

const instance = new Logger('test');

app.use(instance.Middleware());

app.use((ctx,next)=>{
    instance.info(ctx.path);
    instance.info(ctx.response.get('X-Request-ID'));
})

app.listen(3000);