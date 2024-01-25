import express from 'express';
import UserAnswersController from '../controllers/UserAnswers';

const app = express();

app.post('/', UserAnswersController.create);
app.get('/', UserAnswersController.getAll);

module.exports = app;