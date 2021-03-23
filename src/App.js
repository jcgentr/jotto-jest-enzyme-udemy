import React from "react";

import GuessedWords from "./GuessedWords";
import Congrats from "./Congrats";

function App() {
	// dummy data
	const guessedWords = [
		{ guessedWord: "train", letterMatchCount: 3 },
		{ guessedWord: "agile", letterMatchCount: 1 },
		{ guessedWord: "party", letterMatchCount: 5 },
	];

	return (
		<div data-test='component-app' className='container'>
			<h1>Jotto</h1>
			<Congrats success={true} />
			<GuessedWords guessedWords={guessedWords} />
		</div>
	);
}

export default App;
