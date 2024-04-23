'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('RolePermissions', [
      {
        createdAt: new Date(),
        updatedAt: new Date(), PermissionId: 1, RoleId: 1
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(), PermissionId: 2, RoleId: 1
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(), PermissionId: 3, RoleId: 1
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(), PermissionId: 4, RoleId: 1
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(), PermissionId: 2, RoleId: 2
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(), PermissionId: 4, RoleId: 2
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('RolePermissions', null, {});
  }
};
