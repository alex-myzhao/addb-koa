/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('locations', {
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
    surveyID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'surveys',
        key: 'id'
      }
    },
    geoRefID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'geo_refs',
        key: 'id'
      }
    },
    adm1: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    adm2: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    adm3: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    pointName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    pointType: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'locations'
  })
}
