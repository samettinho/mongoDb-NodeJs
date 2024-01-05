import CompanyService from '../services/Company';
import Helpers from '../helpers/Helpers';
import ResponseEnum from '../src/enum/Response';

class Company {

	static async getAll(req, res) {
		try {
			const result = await CompanyService.getAll(req);
			if (!result.type) {
				return res.json(Helpers.responseMessage(ResponseEnum.ERROR, result.message));
			}
			return res.json(Helpers.responseMessage(ResponseEnum.SUCCESS, result.message, result.data));
		}
		catch (error) {
			return res.json(Helpers.responseMessage(ResponseEnum.ERROR, error.message));
		}
	}

}

export default Company;