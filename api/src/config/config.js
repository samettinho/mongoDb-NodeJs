require('dotenv').config();
module.exports = {
  'development': {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
  'test': {
    host: process.env.DB_TEST_HOST,
    name: process.env.DB_TEST_NAME,
    port: process.env.DB_PORT,
  }
};
