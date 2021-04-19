import React, { useState } from "react";
import PropTypes from "prop-types";

import stringsModule from "./helpers/strings";
import { getLetterMatchCount } from "./helpers/index";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";

const Input = ({ secretWord }) => {
	const [currentGuess, setCurrentGuess] = useState("");
	const language = React.useContext(languageContext);
	const [success, setSuccess] = successContext.useSuccess();
	const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();

	const handleSubmit = (event) => {
		event.preventDefault();
		// update guessedWords
		const currentGuessLetterMatchCount = getLetterMatchCount(
			currentGuess,
			secretWord
		);
		setGuessedWords([
			...guessedWords,
			{
				guessedWord: currentGuess,
				letterMatchCount: currentGuessLetterMatchCount,
			},
		]);
		// check if user guessed the secretWord
		if (currentGuess === secretWord) setSuccess(true);
		// clear input box
		setCurrentGuess("");
	};

	if (success) return <div data-test='component-input' />;

	return (
		<div data-test='component-input'>
			<form className='form-inline'>
				<input
					data-test='input-box'
					type='text'
					className='mb-2 mx-sm-3'
					placeholder={stringsModule.getStringByLanguage(
						language,
						"guessInputPlaceholder"
					)}
					onChange={(event) => setCurrentGuess(event.target.value)}
					value={currentGuess}
				/>
				<button
					onClick={handleSubmit}
					data-test='submit-button'
					className='btn btn-primary mb-2'
				>
					{stringsModule.getStringByLanguage(language, "submit")}
				</button>
			</form>
		</div>
	);
};

Input.propTypes = {
	secretWord: PropTypes.string.isRequired,
};

export default Input;
