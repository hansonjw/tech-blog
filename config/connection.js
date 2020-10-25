const Sequelize = require('sequelize');

// ...a zero-dependency modlue that loads environment variables
// from a .env file into process.env
require('dotenv').config();

let sequelize;

// JAWSDS_URL is functionality for Heroku deployment
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
  } else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });
}
  
  
  module.exports = sequelize;
  