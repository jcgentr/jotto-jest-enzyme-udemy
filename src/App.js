import React, { useEffect } from "react";

import Input from "./Input";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import LanguagePicker from "./LanguagePicker";

import hookActions from "./actions";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";
import NewWordButton from "./NewWordButton";
import RandomWordError from "./RandomWordError";
import GiveUpButton from "./GiveUpButton";
import SecretWordInput from "./SecretWordInput";

const reducer = (state, action) => {
	switch (action.type) {
		case "setError":
			return { ...state, isError: action.payload };
		case "setSecretWord":
			return { ...state, secretWord: action.payload };
		case "setLanguage":
			return { ...state, language: action.payload };
		case "setGivenUp":
			return { ...state, givenUp: action.payload };
		default:
			throw new Error(`Invalid action type: ${action.type}`);
	}
};

function App() {
	const [state, dispatch] = React.useReducer(reducer, {
		isError: false,
		secretWord: null,
		language: "en",
		givenUp: false,
	});

	const setSecretWord = (secretWord) => {
		dispatch({ type: "setSecretWord", payload: secretWord });
	};

	const setLanguage = (language) => {
		dispatch({ type: "setLanguage", payload: language });
	};

	const setGivenUp = (givenUp) => {
		dispatch({ type: "setGivenUp", payload: givenUp });
	};

	useEffect(() => {
		hookActions
			.getSecretWord(setSecretWord)
			.then((isError) => dispatch({ type: "setError", payload: isError }));
		// to test without random word server
		// setSecretWord("party");
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
			<p>The secretWord is {state.secretWord}</p>
			{state.isError ? (
				<RandomWordError />
			) : (
				<languageContext.Provider value={state.language}>
					<LanguagePicker setLanguage={setLanguage} />
					<guessedWordsContext.GuessedWordsProvider>
						<successContext.SuccessProvider>
							<SecretWordInput setSecretWord={setSecretWord} />
							<Congrats givenUp={state.givenUp} />
							<Input secretWord={state.secretWord} />
							<GiveUpButton setGivenUp={setGivenUp} />
							<NewWordButton
								setSecretWord={setSecretWord}
								setGivenUp={setGivenUp}
							/>
						</successContext.SuccessProvider>
						<GuessedWords />
					</guessedWordsContext.GuessedWordsProvider>
				</languageContext.Provider>
			)}
		</div>
	);
}

export default App;
