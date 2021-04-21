import React from "react";

import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";
import { getSecretWord } from "./actions";

const NewWordButton = ({ setSecretWord, setGivenUp }) => {
	const [success, setSuccess] = successContext.useSuccess();
	const [, setGuessedWords] = guessedWordsContext.useGuessedWords();

	const handleClick = () => {
		setSuccess(false);
		setGivenUp(false);
		setGuessedWords([]);
		getSecretWord(setSecretWord);
	};

	if (success) {
		return (
			<button
				onClick={handleClick}
				className='btn btn-primary mb-2'
				data-test='new-word-btn'
			>
				New Word
			</button>
		);
	} else {
		return null;
	}
};

export default NewWordButton;
