const jwt = require('jsonwebtoken')

const db = require('../db')
const common = require('../utils/common')
const authConfig = require('../config/auth-config')

let getToken = async (ctx, next) => {
  const { username, password } = ctx.request.query
  const users = db.model('users')
  try {
    let resArr = await users.findAll({
      where: {
        name: username,
        password
      }
    })
    if (resArr.length === 0) {
      throw new Error('User Not Found.')
    } else {
      const userToken = {
        name: resArr[0].name,
        id: resArr[0].id
      }
      const secret = authConfig.secret
      const token = jwt.sign(userToken, secret, { expiresIn: '1h' })
      ctx.response.body = common.feedback(true, token)
    }
  } catch (err) {
    ctx.response.body = common.feedback(false, err.message)
  }
}

module.exports = {
  'GET /token': getToken
}
