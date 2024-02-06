import express from 'express';
import UserTaskController from '../controllers/UserTask';

const app = express();

app.get('/', UserTaskController.getAll);
app.post('/:id', UserTaskController.addTask);
app.get('/totalTaskScore/:id', UserTaskController.totalTaskScore);
app.get('/update', UserTaskController.update);
app.get('/:id', UserTaskController.get);

module.exports = app;