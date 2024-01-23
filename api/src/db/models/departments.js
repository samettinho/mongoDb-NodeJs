import mongoose from 'mongoose';

const { Schema } = mongoose;

const departmentSchema = new Schema({
  name: { type: String, required: true },
  is_removed: { type: Boolean, default: false, required: true },
  date: { type: Date, default: Date.now }
}, { collection: 'departments' });

module.exports = departmentSchema;
