const router = require('koa-router')()

const path = require('path')
const fs = require('fs')

const apiConfig = require('./config/api-config')

function addMapping (router, mapping) {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      // handle GET requests
      let reqPath = `/${apiConfig.PREFIX}/${apiConfig.VERSION}/${url.substring(5)}`
      router.get(reqPath, mapping[url])
      console.log(`register URL mapping: GET ${reqPath}`)
    } else if (url.startsWith('POST ')) {
      // handle POST requests
      let reqPath = `/${apiConfig.PREFIX}/${apiConfig.VERSION}/${url.substring(6)}`
      router.post(reqPath, mapping[url])
      console.log(`register URL mapping: POST ${reqPath}`)
    } else {
      console.log(`invalid URL: ${url}`)
    }
  }
}

function addControllers (router, dir) {
  let files = fs.readdirSync(path.resolve(__dirname, dir))
  let jsFiles = files.filter((f) => {
    return f.endsWith('.js')
  })
  for (let f of jsFiles) {
    console.log(`process controller: ${f}...`)
    let mapping = require(path.resolve(__dirname, 'controllers', f))
    addMapping(router, mapping)
  }
}

module.exports = function (dir) {
  let controllersDir = dir || 'controllers'
  addControllers(router, controllersDir)
  return router.routes()
}
