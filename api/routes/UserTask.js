import express from 'express';
import UserTaskController from '../controllers/UserTask';

const app = express();

app.get('/', UserTaskController.getAll);
app.post('/:id', UserTaskController.addTask);
app.get('/totalTaskScore/:id', UserTaskController.totalTaskScore);
app.get('/update', UserTaskController.update);

module.exports = app;