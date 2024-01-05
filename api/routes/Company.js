import express from 'express';
import CompanyController from '../controllers/Company';

const app = express();

app.get('/', CompanyController.getAll);

module.exports = app;