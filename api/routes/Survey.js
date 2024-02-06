import express from 'express';
import SurveyController from '../controllers/Survey';

const app = express();

app.post('/', SurveyController.create);
app.get('/', SurveyController.getAll);
app.delete('/:id', SurveyController.delete);
app.get('/:id', SurveyController.get);

module.exports = app;