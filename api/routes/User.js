import express from 'express';
import UserController from '../controllers/User';

const app = express();

app.get('/deparmentUser/:id', UserController.deparmentUser);
app.get('/dep', UserController.dep);
app.get('/deneme', UserController.deneme);
app.get('/', UserController.getAll);
app.post('/', UserController.create);
app.get('/:id', UserController.get);

module.exports = app;