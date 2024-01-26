import express from 'express';
import UserAnswersController from '../controllers/UserAnswers';

const app = express();

app.post('/', UserAnswersController.create);
app.get('/', UserAnswersController.getAll);
app.post('/update', UserAnswersController.update);
app.post('/totalScore', UserAnswersController.totalScore);

module.exports = app;