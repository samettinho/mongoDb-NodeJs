import mongoose from 'mongoose';
import dotenv from 'dotenv/config';
import models from './models';
import config from '../config/config';

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

let _db;

let host = config.development.host;

if (env === 'test') {
  host = config.test.host
}
export default {
  connectToServer: async function (callback) {
    try {
      const connection = await mongoose.connect(host);
      _db = models(connection);
      console.log('Connected to MongoDB');
      callback(null, _db);
    } catch (err) {
      console.error(err);
      callback(err, null);
    }
  },

  get: function () {
    return _db;
  }
};