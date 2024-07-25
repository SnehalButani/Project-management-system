'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      { name: "owner", createdAt: new Date(), updatedAt: new Date() }, 
      { name: "design", createdAt: new Date(), updatedAt: new Date() }, 
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles')
  }
};
