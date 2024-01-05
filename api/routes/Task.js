import express from 'express';
import TaskController from '../controllers/Task';

const app = express();

app.get('/', TaskController.getAll);
app.post('/', TaskController.create);

module.exports = app;