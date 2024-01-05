import mongoose from 'mongoose';
import dotenv from 'dotenv/config';
import models from './models';

let _db;

export default {
  connectToServer: async function (callback) {
    try {
      const connection = await mongoose.connect(process.env.DB_HOST);
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