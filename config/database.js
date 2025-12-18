require('dotenv').config();
const { Sequelize } = require('sequelize');

// Setup Sequelize dengan SQLite
const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: process.env.DB_STORAGE || './database.sqlite',
  logging: false, // Set true untuk debug
  define: {
    timestamps: true,
    underscored: false
  }
});

// Test koneksi database (Async/Await - CPMK-2)
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = sequelize;