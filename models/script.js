'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Script extends Model {
    static associate(models) {
      Script.belongsTo(models.Project, { as: 'script', foreignKey: 'project_id' })
    }
  }

  Script.init({
    title: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      trim: true,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      trim: true,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ["pending", "blocked", "accepted"]
    }
  }, {
    sequelize,
    modelName: 'Script',
  });
  return Script;
};