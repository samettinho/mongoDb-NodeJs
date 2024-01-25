import UserAnswersService from '../services/UserAnswers';
import Helpers from '../helpers/Helpers';
import ResponseEnum from '../src/enum/Response';

class UserAnswers {

	static async create(req, res) {
		try {
			const result = await UserAnswersService.create(req);
			if (!result.type) {
				return res.json(Helpers.responseMessage(ResponseEnum.ERROR, result.message));
			}
			return res.json(Helpers.responseMessage(ResponseEnum.SUCCESS, result.message, result.data));
		}
		catch (error) {
			return res.json(Helpers.responseMessage(ResponseEnum.ERROR, error.message));
		}
	}

	static async getAll(req, res) {
		try {
			const result = await UserAnswersService.getAll(req);
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

export default UserAnswers;