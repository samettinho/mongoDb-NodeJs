import db from '../src/db';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;
class UserTask {

	static async getAll(req) {
		try {
			const tasks = await db.get().model('users').aggregate([
				{
					$project: {
						'_id': 0,
						'tasks': '$tasks'
					}
				},
				{
					$unwind: '$tasks'
				},
				{
					$group: {
						_id: '$tasks._id',
						title: { $first: '$tasks.title' },
						statement: { $first: '$tasks.statement' }
					}
				}
			]);
			return {
				type: true,
				message: 'basarili',
				data: tasks
			};
		}
		catch (error) {
			return {
				type: false,
				message: error.message
			};
		}
	}

	static async addTask(req) {
		try {
			const task = req.body.data;
			const user_id = req.params.id;

			const taskCreate = await db.get().model('users').updateOne(
				{
					_id: new ObjectId(user_id)
				},
				{
					$push: {
						tasks: task
					}
				}
			);
			return {
				type: true,
				message: 'başarılı'
			};
		}
		catch (error) {
			return {
				type: false,
				message: error.message
			};
		}
	}

	static async totalTaskScore(req) {
		try {
			const user_id = req.params.id;

			const result = await db.get().model('users').aggregate([
				{
					$match: {
						_id: new ObjectId(user_id)
					}
				},
				{
					$project: {
						full_name: { $concat: [ '$name', ' ', '$surname' ] },
						total_score: {
							$let: {
								vars: {
									totalPoints: { $sum: '$tasks.score' }
								},
								in: '$$totalPoints'
							}
						},
						total_tasks: {
							$let: {
								vars: {
									taskCount: { $size: '$tasks' }
								},
								in: '$$taskCount'
							}
						}
					}
				}
			]);

			return {
				type: true,
				message: 'başarılı',
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
			const result = await db.get().model('users').updateMany(
				{},
				{ $set: { 'tasks.$[elem].score': 1000 } },
				{ arrayFilters: [ { 'elem.score': { $gte: 10 } } ] }
			);
			return {
				type: true,
				message: 'başarılı',
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

export default UserTask;