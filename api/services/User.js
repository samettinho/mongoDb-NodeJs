/* eslint-disable max-len */

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
			// bütün task score alanlarına 50 ekleyip bunlardan 100 den büyük olanları getiriyor ve no 1 alanlarına göre sıralıyor.

			//ardından taskları kendi aralarında score alanına göre küçükten büyüğe sıralıyor 

			const result = await db.get().model('users').aggregate([
				{
					$sort: { 'no': 1 }
				},
				{
					$project: {
						name: {
							$concat: [ '$name', ' ', '$surname' ]
						},
						tasks: {
							$filter: {
								input: {
									$map: {
										input: '$tasks',
										as: 'task',
										in: {
											title: '$$task.title',
											statement: '$$task.statement',
											score: { $add: [ '$$task.score', 50 ] },
											_id: '$$task._id'
										}
									}
								},
								as: 'task',
								cond: { $gte: [ '$$task.score', 100 ] }
							}
						},
						task_count: {
							$size: '$tasks'
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
					$group: {
						_id: '$_id',
						name: {
							$first: '$name'
						},
						total_score: {
							$sum: '$tasks.score'
						},
						tasks: {
							$push: '$tasks'
						},
						task_count: {
							$first: '$task_count'
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
			//department name ve user name alanlarını getiriyor
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
	static async deneme(req) {
		try {
			//task score u 10 dan büyük olanları getiriyor
			const result = await db.get().model('users').aggregate([
				{
					$project: {
						name: 1,
						tasks: {
							$filter: {
								input: '$tasks',
								as: 'task',
								cond: { $gte: [ '$$task.score', 10 ] }
							}
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

}

export default User;