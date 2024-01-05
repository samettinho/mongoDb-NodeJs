import db from '../src/db';
import Language from '../src/language';
class Company {

	static async getAll(req) {
		try {
			const { lang } = req.decoded;
			const companies = await db.get().model('companies').aggregate([
				{
					$lookup: {
						from: 'users',
						localField: '_id',
						foreignField: 'company_id',
						as: 'user'
					}
				}
			]);
			return {
				type: true,
				message: 'basarılı',
				data: companies
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

export default Company;