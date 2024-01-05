/* eslint-disable indent */
/* eslint-disable semi-spacing */
/* eslint-disable max-len */
class Helpers {

	static successMessage(message, data) {
		if (!data) {
			return {
				type: true,
				message: message
			};
		}
		return {
			type: true,
			message: message,
			data: data
		};
	}

	static errorMessage(message) {
		return {
			type: false,
			message: message
		};
	}

	static responseMessage(messageType, message, data) {
		switch (messageType) {
			case 'success':
				return this.successMessage(message, data);
			case 'error':
				return this.errorMessage(message);
			default:
				return this.errorMessage('error');
		}
	}

}
export default Helpers;