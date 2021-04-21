import React from "react";

import guessedWordsContext from "./contexts/guessedWordsContext";
import languageContext from "./contexts/languageContext";
import stringsModule from "./helpers/strings";

const GuessedWords = () => {
	const [guessedWords] = guessedWordsContext.useGuessedWords();
	const language = React.useContext(languageContext);

	return (
		<div data-test='component-guessed-words'>
			{guessedWords.length === 0 ? (
				<span data-test='guess-instructions'>
					{stringsModule.getStringByLanguage(language, "guessPrompt")}
				</span>
			) : (
				<div data-test='guessed-words'>
					<h3>{stringsModule.getStringByLanguage(language, "guessedWords")}</h3>
					<table className='table table-sm'>
						<thead className='thead-light'>
							<tr>
								<th>
									{stringsModule.getStringByLanguage(language, "guessNumber")}
								</th>
								<th>
									{stringsModule.getStringByLanguage(
										language,
										"guessColumnHeader"
									)}
								</th>
								<th>
									{stringsModule.getStringByLanguage(
										language,
										"matchingLettersColumnHeader"
									)}
								</th>
							</tr>
						</thead>
						<tbody>
							{guessedWords.map((word, index) => (
								<tr data-test='guessed-word' key={index}>
									<td>{index + 1}</td>
									<td>{word.guessedWord}</td>
									<td>{word.letterMatchCount}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default GuessedWords;
