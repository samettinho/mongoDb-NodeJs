/* eslint-disable max-len */

import db from '../src/db';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

class UserAnswers {

	static async create(req) {
		try {
			const result = await db.get().model('UserAnswers').create(req.body);
			return {
				type: false,
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

			// bir kullanıcının cevabını getiriyor

			const result = await db.get().model('UserAnswers').aggregate([
				{
					$match: {
						user_id: new ObjectId('65950c9416fd02529779fca8')
					}
				},
				{
					$lookup: {
						from: 'Surveys',
						localField: 'survey_id',
						foreignField: '_id',
						as: 'Survey'
					}
				},
				{
					$unwind: '$Survey'
				},
				{
					$unwind: '$Survey.selections'
				},
				{
					$unwind: '$Survey.selections.questions'
				},
				{
					$unwind: '$Survey.selections.questions.choices'
				},
				{
					$match: {
						$expr: {
							$eq: [ '$choice_id', '$Survey.selections.questions.choices._id' ]
						}
					}
				}
			]);
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

export default UserAnswers;