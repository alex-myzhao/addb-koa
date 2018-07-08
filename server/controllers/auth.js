const db = require('../db')

let getToken = async (ctx, next) => {
  const { username, password } = ctx.request.query
  const users = db.model('users')
  let res = await users.findAll({
    where: {
      name: username,
      password
    }
  })
  ctx.response.body = res
}

module.exports = {
  'GET /token': getToken
}
