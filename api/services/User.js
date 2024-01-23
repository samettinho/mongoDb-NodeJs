
import db from '../src/db';
import dotenv from 'dotenv/config';
import Language from '../src/language';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
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

			const result = await db.get().model('users').aggregate([
				{
					$sort: { 'no': 1 }
				},
				{
					$skip: 2
				},
				{
					$limit: 1
				},
				{
					$project: {
						name: {
							$concat: [ '$name', ' ', '$surname' ]
						},
						tasks: {
							title: 1,
							score: 1
						}

					}
				},
				{
					$unwind: '$tasks'
				},
				{
					$sort: { 'tasks.score': 1 }
				},
				{
					$match: {
						'tasks.score': { $gte: 250 }
					}
				},
				{
					$group: {
						_id: '$_id',
						name: {
							'$first': '$name'
						},
						tasks: {
							$push: '$tasks'
						},
						total_score: {
							$sum: '$tasks.score'
						}
					}
				}

			]);
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
	static async deparmentUser(req) {
		try {

			const result = await db.get().model('users').aggregate([
				{
					$match: {
						_id: new ObjectId('65950c9416fd02529779fca8')
					}
				},
				{
					$lookup: {
						from: 'departments',
						localField: 'departments',
						foreignField: '_id',
						as: 'departments'
					}
				},
				{
					$project: {
						name: 1,
						departments: 1
					}
				}
			]);
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
	static async dep(req) {
		try {

			const result = await db.get().model('users').aggregate([
				{
					$lookup: {
						from: 'departments',
						localField: 'department_id',
						foreignField: '_id',
						as: 'department',
						pipeline: [
							{
								$project: {
									_id: 0
								}
							}
						]
					}
				},
				{
					$project: {
						_id: 1,
						name: 1,
						department_name: { $arrayElemAt: [ '$department.name', 0 ] }
					}
				},
				{
					$group: {
						_id: '$department_name',
						names: {
							$addToSet: '$name'
						}
					}
				},
				{
					$project: {
						_id: 0,
						department_name: '$_id',
						name: '$names'
					}
				},
				{
					$unwind: '$name'
				}
			]);
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