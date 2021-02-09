const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.USER = require('./user')(sequelize, Sequelize);
db.MEMBER = require('./member')(sequelize, Sequelize);
db.STORE = require('./store')(sequelize, Sequelize);
db.PRODUCT = require('./product')(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
