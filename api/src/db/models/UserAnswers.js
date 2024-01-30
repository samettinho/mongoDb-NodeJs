import mongoose from 'mongoose';

const { Schema } = mongoose;

const userAnswersSchema = new Schema({
  survey_id: { type: Schema.Types.ObjectId, ref: 'Surveys', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  selection_id: { type: Schema.Types.ObjectId, ref: 'Surveys', required: true },
  question_id: { type: Schema.Types.ObjectId, ref: 'Surveys', required: true },
  choices: [
    {
      choice_id: { type: Schema.Types.ObjectId, ref: 'Surveys', required: true },
      is_removed: { type: Boolean, default: false, required: true }
    },
  ],
  is_removed: { type: Boolean, default: false, required: true },
  date: { type: Date, default: Date.now }
}, { collection: 'UserAnswers' });

module.exports = userAnswersSchema; 
