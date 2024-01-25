import express from 'express';
import SurveyController from '../controllers/Survey';

const app = express();

app.post('/', SurveyController.create);
app.get('/', SurveyController.getAll);

module.exports = app;