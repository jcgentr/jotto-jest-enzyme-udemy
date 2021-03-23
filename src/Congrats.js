import React from "react";
import PropTypes from "prop-types";

const Congrats = (props) => {
	return (
		<div data-test='component-congrats'>
			{props.success && (
				<div data-test='congrats-message' className='alert alert-success'>
					Congratulations! You guessed the word!
				</div>
			)}
		</div>
	);
};

Congrats.propTypes = {
	success: PropTypes.bool.isRequired,
};

export default Congrats;
