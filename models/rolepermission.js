'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {

  }
  RolePermission.init({
    PermissionId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      references: {
        model: 'Permissions',
        key: 'id'
      }
    },
    RoleId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      references:{
        model: 'Roles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'RolePermission',
  });
  return RolePermission;
};