module.exports = (sequelize, DataTypes) => {
  const USER = sequelize.define(
    'user',
    {
      userId: {
        type: DataTypes.STRING(20), // 20자 이하
        allowNull: false, // 필수 여부
        unique: true, // 고유값 여부
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      store: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      code: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
    }
  );

  return USER;
};
