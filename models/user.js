const { Model } = require('sequelize');
const { hashSync, genSaltSync } = require('bcrypt');
const { saltRounds } = require('../config/config');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { as: 'role', foreignKey: 'role_id' }),
      User.hasMany(models.Project, { as: 'user', foreignKey: 'user_id' })
    }
  }

  User.init({
    firstName: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false,
      validate: { notNull: { msg: "firstname is required" } }
    },
    lastName: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false,
      validate: { notNull: { msg: "lastname is required" } }
    },
    email: {
      type: DataTypes.STRING,
      trim: true,
      unique: { msg: "email already exist" },
      validate: { isEmail: true },
      set(value) {
        this.setDataValue('email', value.toLocaleLowerCase());
      }
    },
    password: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false,
      validate: { notNull: { msg: "password is required" } },
      set(value) {
        this.setDataValue('password', hashSync(value.toString(), genSaltSync(12)));
      }
    },
    otp: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false,
      validate: { notNull: { msg: "otp is required" } },
      set(value) {
        this.setDataValue('otp', hashSync(value.toString(), genSaltSync(saltRounds)))
      }
    },
    otpExpire: {
      type: DataTypes.DATE,
      trim: true,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false,
      validate: { notNull: { msg: "country is required" } }
    },
    city: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false,
      validate: { notNull: { msg: "city is required" } }
    },
    address: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false,
      validate: { notNull: { msg: "address is required" } }
    },
    avatar: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false,
      validate: { notNull: { msg: "avatar is required" } }
    },
    verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};