'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Permissions', [
      { permission: "insert", createdAt: new Date(), updatedAt: new Date() },
      { permission: "update", createdAt: new Date(), updatedAt: new Date() },
      { permission: "delete", createdAt: new Date(), updatedAt: new Date() },
      { permission: "select", createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  async down(queryInterface, Sequelize) {
   return queryInterface.bulkDelete('Permissions',null,{});
  }
};
