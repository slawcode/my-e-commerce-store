// Require Sequelize
const Sequelize = require('sequelize');
require('dotenv').config();

// Create a connection object
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    // Database location
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

// Export Sequelize    
module.exports = sequelize;
