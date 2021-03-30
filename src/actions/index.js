import axios from "axios";

export const getSecretWord = async () => {
	// return response from server
	const response = await axios.get("http://localhost:3030");
	return response.data;
};
