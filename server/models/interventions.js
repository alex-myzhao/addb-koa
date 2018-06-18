/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('interventions', {
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
    locationID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'locations',
        key: 'id'
      }
    },
    diseaseID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'diseases',
        key: 'id'
      }
    },
    group: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    monthsAfterBaseline: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    drug: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    frequency: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    period: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    coverage: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    otherMethods: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    numExamine: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    numPositive: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    numExamineMale: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    numPositiveMale: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    numExamineFemale: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    numPositiveFemale: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    percentPositive: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    percentPositiveMale: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    percentPositiveFemale: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'interventions'
  })
}
