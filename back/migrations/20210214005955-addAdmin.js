'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        userId: 'admin',
        password:
          '$2b$12$8FUS0wOR1CR.HmH4.kfDLOdcUxiKle0yLRJEXigvDrKx9nvMMI9OW',
        name: '슈퍼 관리자',
        email: 'test@gmail.com',
        store: '',
        code: '',
        createdAt: '2021-02-14 10:00:49',
        updatedAt: '2021-02-14 10:00:49',
      },
      {
        userId: 'admin1',
        password:
          '$2b$12$8FUS0wOR1CR.HmH4.kfDLOdcUxiKle0yLRJEXigvDrKx9nvMMI9OW',
        name: '일반 관리자',
        email: 'test1@gmail.com',
        store: '나이키',
        code: 'nike',
        createdAt: '2021-02-14 10:00:49',
        updatedAt: '2021-02-14 10:00:49',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
