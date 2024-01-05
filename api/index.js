import express from 'express';
import router from './auth.js';
import dotenv from 'dotenv/config';
import DB from './src/db/index';
import bodyParser from 'body-parser';
import session from 'express-session';
import AuthRoute from './routes/Auth.js';

const app = express();

const port = process.env.PORT || 7777;

app.use((req, res, next) => {
	const lang = req.headers.language ? req.headers.language : 'tr';
	req.decoded = {
		lang
	};
	next();
});

DB.connectToServer((err) => {
	if (err) {
		process.exit(22);
	}
});
app.use(express.json());

app.use(
	session({
		secret: process.env.PASS_SALT,
		resave: true,
		saveUninitialized: true,
		cookie: {
			expires: 600000
		}
	})
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', AuthRoute);
app.use('/', router);

app.listen(port, () => {
	console.log('server is open, port: ', port);
});

export default app; 