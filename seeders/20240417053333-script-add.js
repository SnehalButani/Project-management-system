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
      },
      {
        title: 'Project 3',
        desc: 'Description of Project 3',
        start_date: '2022-01-01',
        end_date: '2022-02-01',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        project_id:1
      },
      {
        title: 'Project 4',
        desc: 'Description of Project 4',
        start_date: '2022-01-01',
        end_date: '2022-02-01',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        project_id:2
      },
      {
        title: 'Project 5',
        desc: 'Description of Project 5',
        start_date: '2022-01-01',
        end_date: '2022-02-01',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        project_id:1
      },
      {
        title: 'Project 6',
        desc: 'Description of Project 6',
        start_date: '2022-01-01',
        end_date: '2022-02-01',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        project_id:1
      },
      {
        title: 'Project 7',
        desc: 'Description of Project 7',
        start_date: '2022-01-01',
        end_date: '2022-02-01',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        project_id:1
      },
      {
        title: 'Project 8',
        desc: 'Description of Project 8',
        start_date: '2022-01-01',
        end_date: '2022-02-01',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        project_id:1
      },
      {
        title: 'Project 9',
        desc: 'Description of Project 9',
        start_date: '2022-01-01',
        end_date: '2022-02-01',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        project_id:1
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Scripts',null,{})
  }
};
