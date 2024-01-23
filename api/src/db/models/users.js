import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tasks: [ {
    title: { type: String, required: true },
    statement: { type: String, required: true },
    score: { type: Number, required: true }
  } ],
  company_id: { type: Schema.Types.ObjectId, ref: 'companies', required: true },
  is_removed: { type: Boolean, default: false, required: true },
  date: { type: Date, default: Date.now },
  department_id: { type: Schema.Types.ObjectId, ref: 'departments', required: true }
}, { collection: 'users' });

module.exports = userSchema; 
