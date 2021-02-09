'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('members', [
      {
        userId: 'user1',
        password: '$12$.SpCdvwLtwdwDQzlVhetru9jtdUeRCE0JCcu9DWeGHeFnm1519o9C',
        name: '홍길동',
        email: 'qwer11@gmail.com',
        createdAt: '2021-02-09 12:41:49',
        updatedAt: '2021-02-09 12:41:50',
      },
      {
        userId: 'user2',
        password: '$12$.SpCdvwLtwdwDQzlVhetru9jtdUeRCE0JCcu9DWeGHeFnm1519o9C',
        name: '고길동',
        email: 'asdf11@gmail.com',
        createdAt: '2021-02-09 12:41:49',
        updatedAt: '2021-02-09 12:41:50',
      },
      {
        userId: 'user3',
        password: '$12$.SpCdvwLtwdwDQzlVhetru9jtdUeRCE0JCcu9DWeGHeFnm1519o9C',
        name: '이천수',
        email: 'qwer11@gmail.com',
        createdAt: '2021-02-09 12:41:49',
        updatedAt: '2021-02-09 12:41:50',
      },
      {
        userId: 'user4',
        password: '$12$.SpCdvwLtwdwDQzlVhetru9jtdUeRCE0JCcu9DWeGHeFnm1519o9C',
        name: '손흥민',
        email: 'aksdmnc12@gmail.com',
        createdAt: '2021-02-09 12:41:49',
        updatedAt: '2021-02-09 12:41:50',
      },
      {
        userId: 'user5',
        password: '$12$.SpCdvwLtwdwDQzlVhetru9jtdUeRCE0JCcu9DWeGHeFnm1519o9C',
        name: '박지성',
        email: 'qwer1166@gmail.com',
        createdAt: '2021-02-09 12:41:49',
        updatedAt: '2021-02-09 12:41:50',
      },
      {
        userId: 'user6',
        password: '$12$.SpCdvwLtwdwDQzlVhetru9jtdUeRCE0JCcu9DWeGHeFnm1519o9C',
        name: '차범근',
        email: 'qwer11@gmail.com',
        createdAt: '2021-02-09 12:41:49',
        updatedAt: '2021-02-09 12:41:50',
      },
      {
        userId: 'user7',
        password: '$12$.SpCdvwLtwdwDQzlVhetru9jtdUeRCE0JCcu9DWeGHeFnm1519o9C',
        name: '차두리',
        email: 'asdlsl11@gmail.com',
        createdAt: '2021-02-09 12:41:49',
        updatedAt: '2021-02-09 12:41:50',
      },
      {
        userId: 'user8',
        password: '$12$.SpCdvwLtwdwDQzlVhetru9jtdUeRCE0JCcu9DWeGHeFnm1519o9C',
        name: '이영표',
        email: 'qwer116@gmail.com',
        createdAt: '2021-02-09 12:41:49',
        updatedAt: '2021-02-09 12:41:50',
      },
      {
        userId: 'user9',
        password: '$12$.SpCdvwLtwdwDQzlVhetru9jtdUeRCE0JCcu9DWeGHeFnm1519o9C',
        name: '이을용',
        email: 'qwezxcr11@gmail.com',
        createdAt: '2021-02-09 12:41:49',
        updatedAt: '2021-02-09 12:41:50',
      },
      {
        userId: 'user10',
        password: '$12$.SpCdvwLtwdwDQzlVhetru9jtdUeRCE0JCcu9DWeGHeFnm1519o9C',
        name: '김병지',
        email: 'qweghhhr11@gmail.com',
        createdAt: '2021-02-09 12:41:49',
        updatedAt: '2021-02-09 12:41:50',
      },
      {
        userId: 'user11',
        password: '$12$.SpCdvwLtwdwDQzlVhetru9jtdUeRCE0JCcu9DWeGHeFnm1519o9C',
        name: '이근호',
        email: 'qwe36r11@gmail.com',
        createdAt: '2021-02-09 12:41:49',
        updatedAt: '2021-02-09 12:41:50',
      },
      {
        userId: 'user12',
        password: '$12$.SpCdvwLtwdwDQzlVhetru9jtdUeRCE0JCcu9DWeGHeFnm1519o9C',
        name: '홍명보',
        email: 'qwerxz11@gmail.com',
        createdAt: '2021-02-09 12:41:49',
        updatedAt: '2021-02-09 12:41:50',
      },
      {
        userId: 'user13',
        password: '$12$.SpCdvwLtwdwDQzlVhetru9jtdUeRCE0JCcu9DWeGHeFnm1519o9C',
        name: '히딩크',
        email: 'qqwaer11@gmail.com',
        createdAt: '2021-02-09 12:41:49',
        updatedAt: '2021-02-09 12:41:50',
      },
      {
        userId: 'user14',
        password: '$12$.SpCdvwLtwdwDQzlVhetru9jtdUeRCE0JCcu9DWeGHeFnm1519o9C',
        name: '신태용',
        email: 'zxqwer11@gmail.com',
        createdAt: '2021-02-09 12:41:49',
        updatedAt: '2021-02-09 12:41:50',
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
