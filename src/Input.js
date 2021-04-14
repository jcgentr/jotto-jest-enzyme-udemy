import React, { useState } from "react";
import PropTypes from "prop-types";

import stringsModule from "./helpers/strings";
import languageContext from "./contexts/languageContext";

const Input = ({ success, secretWord }) => {
	const [currentGuess, setCurrentGuess] = useState("");
	const language = React.useContext(languageContext);

	const handleClick = (event) => {
		event.preventDefault();
		setCurrentGuess("");
		// TODO: update guessedWords context
		// TODO: check against secretWord and optionally update success context
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
					onClick={handleClick}
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
	success: PropTypes.bool.isRequired,
};

export default Input;
