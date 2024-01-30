/* eslint-disable max-len */

import db from '../src/db';
import dotenv from 'dotenv/config';
import Language from '../src/language';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

class Survey {

	static async create(req) {
		try {
			const result = await db.get().model('Surveys').create(req.body);
			return {
				type: true,
				message: 'basarılı',
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

	static async getAll(req) {
		try {
			const result = await db.get().model('Surveys').find();
			return {
				type: true,
				message: 'basarılı',
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

	static async delete(req) {
		try {
			const survey_id = new ObjectId(req.body.survey_id);
			const result = await db.get().model('Surveys').updateOne({
				_id: new ObjectId(survey_id),
				is_removed: false
			}, { is_removed: true });
			return {
				type: true,
				message: 'basarılı',
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

export default Survey;