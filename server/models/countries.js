/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('countries', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'countries'
  })
}
