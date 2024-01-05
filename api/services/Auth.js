import db from '../src/db';
import dotenv from 'dotenv/config';
import Language from '../src/language/index';
import md5 from 'md5';

class Auth {

	static async register(req) {
		try {
			const { lang } = req.decoded;
			const { body } = req;

			const hashedPassword = md5(md5(body.password) + md5(process.env.PASS_SALT));
			body.password = hashedPassword;

			const emailIsTaken = await db.get().model('users').find({ email: body.email });
			if (emailIsTaken.length !== 0) {
				return {
					type: false,
					message: Language[ lang ].Auth.exists
				};
			}
			const result = await db.get().model('users').create(body);
			return {
				type: true,
				message: Language[ lang ].Auth.success,
				data: result
			};
		}
		catch (error) {
			return {
				type: false,
				message: error.message
			};
		}
	}

	static async login(req) {
		try {
			const { lang } = req.decoded;
			let { email, password } = req.body;
			const hashedPassword = md5(md5(password) + md5(process.env.PASS_SALT));
			password = hashedPassword;
			const user = await db.get().model('users').find({
				email: email,
				password: password
			});
			if (user.length === 0) {
				return {
					type: false,
					message: Language[ lang ].Auth.wrong
				};
			}
			req.session.isLogged = true;
			req.session.user = user;
			return {
				type: true,
				message: Language[ lang ].Auth.loginSuccess,
				data: user
			};
		}
		catch (error) {
			return {
				type: false,
				message: error.message
			};
		}
	}

}

export default Auth;