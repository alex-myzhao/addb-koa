/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('diseases', {
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
    information: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    species: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    diagnosticSymptoms: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    diagnosticBlood: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    diagnosticSkin: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    diagnosticStool: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    numSamples: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    numSpecimen: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    ageLower: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    ageUpper: {
      type: DataTypes.INTEGER(11),
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
    percentPositive: {
      type: DataTypes.FLOAT,
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
    percentPositiveMale: {
      type: DataTypes.FLOAT,
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
    percentPositiveFemale: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'diseases'
  })
}
