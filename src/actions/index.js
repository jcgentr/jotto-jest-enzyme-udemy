import axios from "axios";

export const getSecretWord = async (setSecretWord) => {
	try {
		const response = await axios.get(
			"http://random-word-api.herokuapp.com/word?number=1"
		);
		if (response.status === 200) {
			setSecretWord(response.data[0]);
			return false;
		}
		return true;
	} catch (error) {
		return true;
	}
};

// default export for mocking convenience
const exportedObject = { getSecretWord };
export default exportedObject;
