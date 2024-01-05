import Language from '../src/language/index';

class Authenticate {

	static async auth(req, res, next) {
		const { lang } = req.decoded;
		if (req.session.isLogged !== true) {
			return res.status(401).json({
				type: false,
				message: Language[ lang ].Auth.login
			});
		}
		req.decoded.user = req.session.user;
		next();
	}

}

export default Authenticate;