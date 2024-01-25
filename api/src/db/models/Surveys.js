import mongoose from 'mongoose';

const { Schema } = mongoose;
const choiceSchema = new Schema({
  choice: { type: String, required: true },
  date: { type: Date, default: Date.now },
  is_removed: { type: Boolean, default: false, required: true }
});

const questionSchema = new Schema({
  question: { type: String, required: true },
  choices: [ choiceSchema ],
  date: { type: Date, default: Date.now },
  is_removed: { type: Boolean, default: false, required: true }
});

const selectionSchema = new Schema({
  name: { type: String, required: true },
  questions: [ questionSchema ],
  date: { type: Date, default: Date.now },
  is_removed: { type: Boolean, default: false, required: true }
});

const surveySchema = new Schema({
  name: { type: String, required: true },
  selections: [ selectionSchema ],
  date: { type: Date, default: Date.now },
  is_removed: { type: Boolean, default: false, required: true }
}, { collection: 'Surveys' });

module.exports = surveySchema;
