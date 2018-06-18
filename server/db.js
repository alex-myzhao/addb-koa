const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('./config/mysql-config')

console.log('init sequelize...')

function importModels (sequelize) {
  let files = fs.readdirSync(path.resolve(__dirname, 'models'))

  let jsFiles = files.filter((f) => {
    return f.endsWith('.js')
  }, files)

  for (let f of jsFiles) {
    console.log(`import model from file ${path.resolve(__dirname, 'models', f)}...`)
    sequelize.import(path.resolve(__dirname, 'models', f))
  }
  console.log('Done.')
}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql',
    define: {
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      },
      timestamps: false
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    operatorsAliases: false
  }
)

importModels(sequelize)

module.exports = sequelize
