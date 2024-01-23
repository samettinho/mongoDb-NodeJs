import db from '../src/db';
import dotenv from 'dotenv/config';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
class Task {

	static async create(req) {
		try {
			const { body } = req;
			body.user_id = new ObjectId(body.user_id);
			const user = await db.get().model('users').find({ _id: body.user_id });
			if (user.length === 0) {
				return {
					type: false,
					message: 'böyle bir calısan yok'
				};
			}
			const task = await db.get().model('tasks').create(body);
			if (task.length === 0) {
				return {
					type: false,
					message: 'task oluşturulmadı'
				};
			}
			return {
				type: true,
				message: 'task oluşturldu',
				data: task
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

			const result = await db.get().model('tasks').aggregate([
				{
					$lookup: {
						from: 'users',
						localField: 'user_id',
						foreignField: '_id',
						as: 'user',
						pipeline: [
							{
								$lookup: {
									from: 'companies',
									localField: 'company_id',
									foreignField: '_id',
									as: 'company'
								}
							},
							{
								$unwind: '$company'
							}
						]
					}
				},
				{
					$unwind: '$user'
				},
				{
					$project: {
						'name': 1,
						'statement': 1,
						'user_name': '$user.name',
						'company_name': '$user.company.name'
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
	static async get(req) {
		try {
			const user_id = req.decoded.user.id;
			const result = await db.get().model('tasks').aggregate([
				{
					$lookup: {
						from: 'users',
						localField: 'user_id',
						foreignField: '_id',
						as: 'user',
						pipeline: [
							{
								$lookup: {
									from: 'companies',
									localField: 'company_id',
									foreignField: '_id',
									as: 'company'
								}
							}
						]
					}
				},
				{
					$unwind: '$user'
				},
				{
					$project: {
						'name': 1,
						'statement': 1,
						'user_name': '$user.name',
						'company_name': '$user.company.name'
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

}

export default Task;