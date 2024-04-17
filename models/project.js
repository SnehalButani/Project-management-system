'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.hasMany(models.Script, { as: 'script', foreignKey: 'project_id' }),
      Project.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' })
    }
  }

  Project.init({
    Pro_name: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false,
      validate: { notNull: { msg: "project name is required" } }
    },
    start_date: {
      type: DataTypes.DATE,
      trim: true,
      allowNull: false,
      validate: { notNull: { msg: "start_date is required" } }
    },
    end_date: {
      type: DataTypes.DATE,
      trim: true,
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false,
      validate: { notNull: { msg: "desc is required" } }
    },
    budget: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false
    },
    priority: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ["pending", "cancel", "accepted"]
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};