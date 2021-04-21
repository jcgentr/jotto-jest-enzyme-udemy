import React, { useState, useContext } from "react";

import stringsModule from "./helpers/strings";
import guessedWordsContext from "./contexts/guessedWordsContext";
import languageContext from "./contexts/languageContext";

const SecretWordInput = ({ setSecretWord }) => {
	const [secretWordInput, setSecretWordInput] = useState("");
	const [guessedWords] = guessedWordsContext.useGuessedWords();
	const language = useContext(languageContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		setSecretWord(secretWordInput);
		setSecretWordInput("");
	};

	if (guessedWords.length === 0) {
		return (
			<div data-test='secret-word-input'>
				<form className='form-inline'>
					<input
						data-test='secret-word-input-box'
						type='text'
						className='mb-2 mx-sm-3'
						placeholder='Enter secret word'
						onChange={(event) => setSecretWordInput(event.target.value)}
						value={secretWordInput}
					/>
					<button
						onClick={handleSubmit}
						data-test='secret-word-submit-button'
						className='btn btn-success mb-2'
					>
						{stringsModule.getStringByLanguage(language, "submit")}
					</button>
				</form>
			</div>
		);
	} else {
		return null;
	}
};

export default SecretWordInput;
