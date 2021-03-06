const languageStrings = {
	en: {
		congrats: "Congratulations! You guessed the word!",
		submit: "Submit",
		guessPrompt: "Try to guess the secret word!",
		guessNumber: "Guess Number",
		guessInputPlaceholder: "enter guess",
		guessColumnHeader: "Guessed Words",
		guessedWords: "Guesses",
		matchingLettersColumnHeader: "Matching Letters",
	},
	emoji: {
		congrats: "🎯🎉",
		submit: "🚀",
		guessPrompt: "🤔🤫🔤",
		guessNumber: "🔤",
		guessInputPlaceholder: "⌨️🤔",
		guessedWords: "🤷‍🔤",
		guessColumnHeader: "🤷‍",
		matchingLettersColumnHeader: "✅",
	},
};

function getStringByLanguage(
	languageCode,
	stringKey,
	strings = languageStrings
) {
	if (!strings[languageCode] || !strings[languageCode][stringKey]) {
		console.warn(`Could not get string [${stringKey}] for [${languageCode}]`);
		return strings.en[stringKey];
	}
	return strings[languageCode][stringKey];
}

const exportedObject = { getStringByLanguage };

export default exportedObject;
