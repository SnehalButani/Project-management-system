'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Scripts', [
      {
        title: 'Project 1',
        desc: 'Description of Project 1',
        start_date: '2022-01-01',
        end_date: '2022-02-01',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        project_id:1
      },
      {
        title: 'Project 2',
        desc: 'Description of Project 2',
        start_date: '2022-01-01',
        end_date: '2022-02-01',
        status: 'blocked',
        createdAt: new Date(),
        updatedAt: new Date(),
        project_id:1
      }
    ])
  },

  async down(queryInterface, Sequelize) {

  }
};
