const { Model } = require('sequelize');
const {  hash } = require('bcrypt');
const {saltRounds} = require('../config/config');

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
        this.setDataValue('password', hash(value));
      }
    },
    otp: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false,
      validate: { notNull: { msg: "password is required" } },
      set(value) {
        this.setDataValue('otp', hash(value))
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
      defaultValue:false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};