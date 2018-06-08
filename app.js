const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
const json = require('koa-json');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const serve = require('koa-static');

app.use(bodyParser());
app.use(json());
app.use(logger());

// static
app.use(serve(path.resolve('dist')));

// time cost
app.use(async (ctx, next) => {
  let start = new Date;
  await next;
  let ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.listen(3000, () => {
  console.log('ADDB is now listening in localhost:3000');
});

module.exports = app;
