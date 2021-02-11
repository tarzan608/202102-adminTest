module.exports = (sequelize, DataTypes) => {
  const STORE = sequelize.define(
    'store',
    {
      storeId: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      storeName: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      storeCode: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      userName: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(100),
        allowNull: false,
        // unique: true,
      },
      tel: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      businessNum: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );

  return STORE;
};
