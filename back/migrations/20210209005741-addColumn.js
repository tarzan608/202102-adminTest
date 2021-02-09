'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('stores', [
      {
        storeName: '상점1',
        storeCode: 'asdf',
        userName: '홍길동',
        address: '경기도 남양주시',
        tel: '0313215567',
        businessNum: '1234567890',
        createdAt: '2020-02-09',
        updatedAt: '2020-02-09',
      },
      {
        storeName: '상점2',
        storeCode: 'qwer',
        userName: '손흥민',
        address: '서울시 송파구',
        tel: '0109874561',
        businessNum: '9876543210',
        createdAt: '2020-02-09',
        updatedAt: '2020-02-09',
      },
      {
        storeName: '상점3',
        storeCode: '1234',
        userName: '박지성',
        address: '서울시 강남구',
        tel: '01012345678',
        businessNum: '7891234560',
        createdAt: '2020-02-09',
        updatedAt: '2020-02-09',
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
