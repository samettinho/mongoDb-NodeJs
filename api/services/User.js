
import db from '../src/db';
import dotenv from 'dotenv/config';
import Language from '../src/language';
import mongoose from 'mongoose';

class User {

	static async create(req) {
		try {
			const { lang } = req.decoded;
			const { body } = req;
			body.company_id = new mongoose.Types.ObjectId(body.company_id);
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
				message: 'basarili'
			};
		}
		catch (error) {
			return {
				type: false,
				message: error.message
			};
		}
	}
	static async getAll(req) {
		try {

			const result = await db.get().model('users').find();
			return {
				type: true,
				message: 'basarili',
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

}

export default User;