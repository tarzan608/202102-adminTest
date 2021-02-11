'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('stores', [
      {
        storeId: 'amdo132mdo1245',
        storeName: 'zardins',
        storeCode: 'test',
        userName: '홍길동',
        address: '경기도 남양주시',
        tel: '0313215567',
        businessNum: '1234567890',
        createdAt: '2021-02-09 12:41:49',
        updatedAt: '2021-02-09 12:41:49',
      },
      {
        storeId: 'amdo121mdo1245',
        storeName: '자뎅',
        storeCode: 'testcode',
        userName: '손흥민',
        address: '서울시 송파구',
        tel: '0109874561',
        businessNum: '9876543210',
        createdAt: '2021-02-09 12:41:49',
        updatedAt: '2021-02-09 12:41:49',
      },
      {
        storeId: 'amdo132mdo1266',
        storeName: '무신사',
        storeCode: 'code',
        userName: '박지성',
        address: '서울시 강남구',
        tel: '01012345678',
        businessNum: '7891234560',
        createdAt: '2021-02-09 12:41:49',
        updatedAt: '2021-02-09 12:41:49',
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
