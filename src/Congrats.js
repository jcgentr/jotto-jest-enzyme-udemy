import React from "react";
import PropTypes from "prop-types";

import languageContext from "./contexts/languageContext";
import stringsModule from "./helpers/strings";

const Congrats = (props) => {
	const language = React.useContext(languageContext);
	return (
		<div data-test='component-congrats'>
			{props.success && (
				<div data-test='congrats-message' className='alert alert-success'>
					{stringsModule.getStringByLanguage(language, "congrats")}
				</div>
			)}
		</div>
	);
};

Congrats.propTypes = {
	success: PropTypes.bool.isRequired,
};

export default Congrats;
