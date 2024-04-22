'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "snehal",
        lastName: "butani",
        email: "dev.testapp441@gmail.com",
        password: "Snehal1234@",
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
