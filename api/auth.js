import express from 'express';
import fs from 'fs';
import AuthenticateHelper from './helpers/Authenticate';

const app = express();
fs.readdir('./api/routes', (err, files) => {
	if (err) throw err;

	for (let file of files) {
		const routeName = file.slice(0, file.length - 3);
		const routeNameLower = routeName.toLowerCase();
		let routeFile = require(`./routes/${routeName}.js`);
		app.use(`/${routeNameLower}`, routeFile);
	}
});

module.exports = app;