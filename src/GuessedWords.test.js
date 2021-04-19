import React from "react";
import { shallow } from "enzyme";

import GuessedWords from "./GuessedWords";
import { findByTestAttr } from "../test/testUtils";

import guessedWordsContext from "./contexts/guessedWordsContext";

const setup = (guessedWords = []) => {
	const mockUseGuessedWords = jest
		.fn()
		.mockReturnValue([guessedWords, jest.fn()]);
	guessedWordsContext.useGuessedWords = mockUseGuessedWords;
	return shallow(<GuessedWords />);
};

describe("if there are no words guessed", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = setup([]);
	});
	test("renders without error", () => {
		const component = findByTestAttr(wrapper, "component-guessed-words");
		expect(component.length).toBe(1);
	});
	test("renders instructions to guess a word", () => {
		const instructions = findByTestAttr(wrapper, "guess-instructions");
		expect(instructions.text().length).not.toBe(0);
	});
});
describe("if there are words guessed", () => {
	const guessedWords = [
		{ guessedWord: "train", letterMatchCount: 3 },
		{ guessedWord: "agile", letterMatchCount: 1 },
		{ guessedWord: "party", letterMatchCount: 5 },
	];
	let wrapper;
	beforeEach(() => {
		wrapper = setup(guessedWords);
	});
	test("renders without error", () => {
		const component = findByTestAttr(wrapper, "component-guessed-words");
		expect(component.length).toBe(1);
	});
	test('renders "guessed words" section', () => {
		const guessedWordsNode = findByTestAttr(wrapper, "guessed-words");
		expect(guessedWordsNode.length).toBe(1);
	});
	test("renders correct number of guessed words", () => {
		const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
		expect(guessedWordNodes.length).toBe(guessedWords.length);
	});
});
describe("languagePicker", () => {
	test("should render guess instructions string in English by default", () => {
		const wrapper = setup([]);
		const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
		expect(guessInstructions.text()).toBe("Try to guess the secret word!");
	});
	test("should render guess instructions string in emoji", () => {
		const mockUseContext = jest.fn().mockReturnValue("emoji");
		React.useContext = mockUseContext;
		const wrapper = setup([]);
		const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
		expect(guessInstructions.text()).toBe("🤔🤫🔤");
	});
});
