import React from "react";

import successContext from "./contexts/successContext";
import languageContext from "./contexts/languageContext";
import stringsModule from "./helpers/strings";

const Congrats = ({ givenUp = false }) => {
	const [success] = successContext.useSuccess();
	const language = React.useContext(languageContext);

	const renderMessage = () => {
		if (success && givenUp) {
			return (
				<div data-test='you-lose-message' className='alert alert-info'>
					Better luck next time!
				</div>
			);
		} else if (success) {
			return (
				<div data-test='congrats-message' className='alert alert-success'>
					{stringsModule.getStringByLanguage(language, "congrats")}
				</div>
			);
		}
	};

	return <div data-test='component-congrats'>{renderMessage()}</div>;
};

export default Congrats;
