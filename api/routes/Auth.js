import express from 'express';
import AuthController from '../controllers/Auth';

const app = express();

app.post('/register', AuthController.register);
app.post('/login', AuthController.login);

module.exports = app;