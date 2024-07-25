'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectMember extends Model {
    static associate(models) {
      ProjectMember.belongsTo(models.User, { foreignKey: 'userId' });
      ProjectMember.belongsTo(models.Project, { foreignKey: 'projectId' });
      ProjectMember.belongsTo(models.Role, { foreignKey: 'roleId' });
    }
  }
  ProjectMember.init({
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProjectMember',
  });
  return ProjectMember;
};