/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('reports', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    reporterID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'reporters',
        key: 'id'
      }
    },
    diseaseID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'disease_types',
        key: 'id'
      }
    },
    countryID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'countries',
        key: 'id'
      }
    },
    categoryID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    journal: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    authors: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    yearOfPub: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    volume: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    issue: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    pageFrom: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    pageTo: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    authorContactNeeded: {
      type: DataTypes.ENUM('No', 'Yes', 'Already'),
      allowNull: false
    },
    openAccess: {
      type: DataTypes.ENUM('No', 'Yes'),
      allowNull: false
    },
    checked: {
      type: DataTypes.ENUM('No', 'Yes'),
      allowNull: false
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'reports'
  })
}
