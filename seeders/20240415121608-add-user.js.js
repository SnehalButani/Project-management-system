'use strict';

const { hashPassword } = require('../utils/helper');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword =  hashPassword('password123')
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "snehal",
        lastName: "butani",
        email: "dev.testapp441@gmail.com",
        password: hashedPassword,
        country: "india",
        city: "surat",
        address: "123,llalo,surat",
        createdAt: new Date(),
        updatedAt: new Date(),
        role_id: 1
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
