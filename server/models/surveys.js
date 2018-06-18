/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('surveys', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    reportID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'reports',
        key: 'id'
      }
    },
    dataType: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    surveyType: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    monthStart: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    monthFinish: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    yearStart: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    yearFinish: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'surveys'
  })
}
