'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Permissions', [
      { permission: "create", createdAt: new Date(), updatedAt: new Date() },
      { permission: "edit", createdAt: new Date(), updatedAt: new Date() },
      { permission: "delete", createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
