import React, { useState } from "react";
import PropTypes from "prop-types";

const Input = ({ secretWord }) => {
	const [currentGuess, setCurrentGuess] = useState("");

	const handleClick = (event) => {
		event.preventDefault();
		setCurrentGuess("");
		// TODO: update guessedWords context
		// TODO: check against secretWord and optionally update success context
	};

	return (
		<div data-test='component-input'>
			<form className='form-inline'>
				<input
					data-test='input-box'
					type='text'
					className='mb-2 mx-sm-3'
					placeholder='enter guess'
					onChange={(event) => setCurrentGuess(event.target.value)}
					value={currentGuess}
				/>
				<button
					onClick={handleClick}
					data-test='submit-button'
					className='btn btn-primary mb-2'
				>
					Submit
				</button>
			</form>
		</div>
	);
};

Input.propTypes = {
	secretWord: PropTypes.string.isRequired,
};

export default Input;
