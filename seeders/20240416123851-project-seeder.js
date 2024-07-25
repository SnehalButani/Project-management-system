'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Projects', [
      {
        Pro_name: 'Project 1',
        start_date: '2022-01-01',
        end_date: '2022-02-01',
        desc: 'Description of Project 1',
        budget: '10000',
        priority: 'High',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id:1
      },
      {
        Pro_name: 'Project 2',
        start_date: '2022-03-01',
        end_date: '2022-04-01',
        desc: 'Description of Project 2',
        budget: '15000',
        priority: 'Medium',
        status: 'cancel',
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id:1
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Projects', null, {});
  }
};
