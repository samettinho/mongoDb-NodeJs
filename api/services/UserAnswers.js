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
				},
				{
					$lookup: {
						from: 'users',
						localField: 'user_id',
						foreignField: '_id',
						as: 'user'
					}
				},
				{
					$unwind: '$user'
				},
				{
					$project: {
						name: { $concat: [ '$user.name', ' ', '$user.surname' ] },
						survey_name: '$Survey.name',
						question_name: '$Survey.selections.questions.question',
						choice_name: '$Survey.selections.questions.choices.choice'
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

	static async update(req) {
		try {
			const user_id = new ObjectId(req.body.user_id);
			const question_id = new ObjectId(req.body.question_id);
			const result = await db.get().model('UserAnswers').updateOne({
				user_id: new ObjectId(user_id),
				question_id: new ObjectId(question_id),
				is_removed: false
			}, req.body);
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

	static async totalScore(req) {
		try {
			const user_id = new ObjectId(req.body.user_id);
			const result = await db.get().model('UserAnswers').aggregate([
				{
					$match: {
						user_id: new ObjectId(user_id)
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
				},
				{
					$lookup: {
						from: 'users',
						localField: 'user_id',
						foreignField: '_id',
						as: 'user'
					}
				},
				{
					$unwind: '$user'
				},
				{
					$group: {
						_id: '$user.name',
						name: {
							$first: '$user.name'
						},
						total_score: {
							$sum: '$Survey.selections.questions.choices.point'
						}
					}
				},
				{
					$project: {
						_id: 0,
						name: 1,
						total_score: 1
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