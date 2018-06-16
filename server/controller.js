const router = require('koa-router')()

const path = require('path')
const fs = require('fs')

function addMapping (router, mapping) {
  for (var url in mapping) {
    if (url.startsWith('GET ')) {
      // 如果url类似"GET xxx":
      let reqPath = url.substring(4)
      router.get(reqPath, mapping[url])
      console.log(`register URL mapping: GET ${reqPath}`)
    } else if (url.startsWith('POST ')) {
      // 如果url类似"POST xxx":
      let reqPath = url.substring(5)
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
  let controllersDir = dir || 'controllers' // 如果不传参数，扫描目录默认为'controllers'
  addControllers(router, controllersDir)
  return router.routes()
}
