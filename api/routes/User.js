import express from 'express';
import UserController from '../controllers/User';

const app = express();

app.get('/', UserController.getAll);
app.post('/', UserController.create);

module.exports = app;