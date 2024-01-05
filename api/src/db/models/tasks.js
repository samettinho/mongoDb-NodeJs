import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema({
  name: { type: String, required: true },
  statement: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  is_removed: { type: Boolean, default: false, required: true },
  date: { type: Date, default: Date.now }
}, { collection: 'tasks' });

module.exports = taskSchema;
