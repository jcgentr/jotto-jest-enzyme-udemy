import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";

const setup = (state = {}) => {
	const wrapper = mount(<App />);

	const inputBox = findByTestAttr(wrapper, "input-box");
	inputBox.simulate("change", { target: { value: "train" } });

	const submitButton = findByTestAttr(wrapper, "submit-button");
	submitButton.simulate("click", { preventDefault() {} });

	return wrapper;
};

describe.skip("no words guessed", () => {
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

describe.skip("some words guessed", () => {
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

describe.skip("guess secret word", () => {
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
