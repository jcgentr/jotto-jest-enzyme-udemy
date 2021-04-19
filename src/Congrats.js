import React from "react";

import successContext from "./contexts/successContext";
import languageContext from "./contexts/languageContext";
import stringsModule from "./helpers/strings";

const Congrats = () => {
	const [success] = successContext.useSuccess();
	const language = React.useContext(languageContext);

	return (
		<div data-test='component-congrats'>
			{success && (
				<div data-test='congrats-message' className='alert alert-success'>
					{stringsModule.getStringByLanguage(language, "congrats")}
				</div>
			)}
		</div>
	);
};

export default Congrats;
