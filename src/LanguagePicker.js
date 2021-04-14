import React from "react";
import PropTypes from "prop-types";

const LanguagePicker = ({ setLanguage }) => {
	const languages = [
		{ code: "en", symbol: "🇺🇸" },
		{ code: "emoji", symbol: "😊" },
	];

	const languageIcons = languages.map((language) => (
		<span
			data-test='language-icon'
			key={language.code}
			onClick={() => setLanguage(language.code)}
		>
			{language.symbol}
		</span>
	));

	return <div data-test='component-language-picker'>{languageIcons}</div>;
};

LanguagePicker.propTypes = {
	setLanguage: PropTypes.func.isRequired,
};

export default LanguagePicker;
