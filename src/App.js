import React, { useEffect } from "react";

import Input from "./Input";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import LanguagePicker from "./LanguagePicker";

import { getSecretWord } from "./actions";
import languageContext from "./contexts/languageContext";

const reducer = (state, action) => {
	switch (action.type) {
		case "setSecretWord":
			return { ...state, secretWord: action.payload };
		case "setLanguage":
			return { ...state, language: action.payload };
		default:
			throw new Error(`Invalid action type: ${action.type}`);
	}
};

function App() {
	const [state, dispatch] = React.useReducer(reducer, {
		secretWord: null,
		language: "en",
	});

	// TODO: get props from shared state
	const success = false;
	const guessedWords = [];

	const setSecretWord = (secretWord) => {
		dispatch({ type: "setSecretWord", payload: secretWord });
	};

	const setLanguage = (language) => {
		dispatch({ type: "setLanguage", payload: language });
	};

	useEffect(() => {
		getSecretWord(setSecretWord);
		// to test without random word server
		setSecretWord("party");
		return () => {
			// cleanup
		};
	}, []);

	if (state.secretWord === null) {
		return (
			<div className='container' data-test='spinner'>
				<div className='spinner-border' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
				<p>Loading secret word...</p>
			</div>
		);
	}

	return (
		<div data-test='component-app' className='container'>
			<h1>Jotto</h1>
			<languageContext.Provider value={state.language}>
				<LanguagePicker setLanguage={setLanguage} />
				<Congrats success={success} />
				<Input success={success} secretWord={state.secretWord} />
				<GuessedWords guessedWords={guessedWords} />
			</languageContext.Provider>
		</div>
	);
}

export default App;
