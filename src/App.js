import React from "react";
import GuessedWords from "./GuessedWords";

function App() {
	// dummy data
	const guessedWords = [
		{ guessedWord: "train", letterMatchCount: 3 },
		{ guessedWord: "agile", letterMatchCount: 1 },
		{ guessedWord: "party", letterMatchCount: 5 },
	];

	return (
		<div data-test='component-app'>
			<GuessedWords guessedWords={guessedWords} />
		</div>
	);
}

export default App;
