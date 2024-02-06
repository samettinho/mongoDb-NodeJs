require('dotenv').config();
const config = require('../config/config');
const mongoose = require('mongoose');
import models from '../db/models/index';
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const path = require('path');
const basename = path.basename(__filename);

const fs = require('fs');

let host = config.development.host;

if (env === 'test') {
  host = config.test.host
}

module.exports = (async () => {
  console.log('Veritabanı sıfırlama ve kurma işlemi yapılıyor..');
  try {
    const connection = await mongoose.connect(host);
    await mongoose.connection.db.dropDatabase();
    const files = fs.readdirSync(__dirname).filter((file) => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    });
    for (const file of files) {
      const seed = require(`./${file}`);
      const modelName = file.split('.')[ 0 ];
      await models(connection).model(`${modelName}`).insertMany(seed);
      console.log(`* ${modelName} seeded`);
    }

    console.log('Veritabanı sıfırlama ve kurma işlemi başarılı.');
    process.exit(0);

  } catch (err) {

    console.log(err);
    console.log('Veritabanı sıfırlama ve kurma işlemi başarısız.');
    process.exit(1);
  }
})();