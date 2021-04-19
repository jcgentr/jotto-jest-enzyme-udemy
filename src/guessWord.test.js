import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";

import Input from "./Input";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";

import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";

// functional tests for guessing a word in the application

const setup = ({ secretWord, guessedWords }) => {
	const wrapper = mount(
		<guessedWordsContext.GuessedWordsProvider>
			<successContext.SuccessProvider>
				<Congrats />
				<Input secretWord={secretWord} />
			</successContext.SuccessProvider>
			<GuessedWords />
		</guessedWordsContext.GuessedWordsProvider>
	);

	const inputBox = findByTestAttr(wrapper, "input-box");
	inputBox.simulate("change", { target: { value: "train" } });

	const submitButton = findByTestAttr(wrapper, "submit-button");
	submitButton.simulate("click", { preventDefault() {} });

	guessedWords.map((guess) => {
		const mockEvent = { target: { value: guess.guessedWord } };
		inputBox.simulate("change", mockEvent);
		submitButton.simulate("click", { preventDefault() {} });
	});

	return wrapper;
};

describe("no words guessed", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = setup({
			secretWord: "party",
			success: false,
			guessedWords: [],
		});
	});
	test("renders guess instructions and no table", () => {
		const guessedWordRows = findByTestAttr(wrapper, "guessed-word");
		expect(guessedWordRows).toHaveLength(1);
	});
});

describe("some words guessed", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = setup({
			secretWord: "party",
			success: false,
			guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }],
		});
	});
	test("creates GuessedWords table with one row", () => {
		const guessedWordRows = findByTestAttr(wrapper, "guessed-word");
		expect(guessedWordRows).toHaveLength(2);
	});
});

describe("guess secret word", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = setup({
			secretWord: "party",
			success: false,
			guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }],
		});
		// guess secret word
		const inputBox = findByTestAttr(wrapper, "input-box");
		inputBox.simulate("change", { target: { value: "party" } });

		const submitButton = findByTestAttr(wrapper, "submit-button");
		submitButton.simulate("click", { preventDefault() {} });
	});
	test("adds row to guessedWords table", () => {
		const guessedWordRows = findByTestAttr(wrapper, "guessed-word");
		expect(guessedWordRows).toHaveLength(3);
	});
	test("displays congrats message", () => {
		const message = findByTestAttr(wrapper, "congrats-message");
		expect(message.text().length).toBeGreaterThan(0);
	});
	test("does not display input component contents", () => {
		const inputBox = findByTestAttr(wrapper, "input-box");
		expect(inputBox.exists()).toBe(false);
		const submitButton = findByTestAttr(wrapper, "submit-button");
		expect(submitButton.exists()).toBe(false);
	});
});
