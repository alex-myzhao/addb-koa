// KOA middlewares
const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const jwt = require('koa-jwt')
const historyApiFallback = require('koa2-history-api-fallback')
const serve = require('koa-static')

// Nodejs
const path = require('path')

// DIY middlewares
const controller = require('./controller')
const authConfig = require('./config/auth-config')

// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  await next()
})

app.use(logger())
app.use(bodyParser())
app.use(json())

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function (ctx, next) {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = 'Protected resource, use Authorization header to get access\n'
    } else {
      throw err
    }
  })
})

// Middleware below this line is only reached if JWT token is valid
// unless the URL starts with '/public'
app.use(jwt({ secret: authConfig.secret }).unless({ path: authConfig.unprotectedPath }))

// handle APIs
app.use(controller())

// solve static resources
app.use(historyApiFallback())
app.use(serve(path.resolve('dist')))

// time cost
app.use(async (ctx, next) => {
  let start = new Date()
  await next
  let ms = new Date() - start
  console.log('%s %s - %s', this.method, this.url, ms)
})

app.listen(3000, () => {
  console.log('ADDB is now listening in http://localhost:3000')
})

module.exports = app
