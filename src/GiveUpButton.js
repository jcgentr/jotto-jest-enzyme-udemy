import React from "react";

import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";

const GiveUpButton = ({ setGivenUp }) => {
	const [success, setSuccess] = successContext.useSuccess();
	const [guessedWords] = guessedWordsContext.useGuessedWords();

	const handleClick = () => {
		setSuccess(true);
		setGivenUp(true);
	};

	if (!success && guessedWords.length > 0) {
		return (
			<button
				onClick={handleClick}
				className='btn btn-warning mb-2'
				data-test='give-up-btn'
			>
				Give Up
			</button>
		);
	} else {
		return null;
	}
};

export default GiveUpButton;
