'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Role extends Model {
    static associate(models) {
      Role.hasOne(models.User, { as: 'role', foreignKey: 'role_id' })
      Role.belongsToMany(models.Permission, { through: 'RolePermission' })
    }
  }

  Role.init({
    name: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Role',
    timestamps:true,
    hooks: {
      beforeCreate: (role, options) => {
        role.createdAt = new Date();
        role.updatedAt = new Date();
      },
      beforeUpdate: (role, options) => {
        role.updatedAt = new Date();
      }
    }
  });
  return Role;
};