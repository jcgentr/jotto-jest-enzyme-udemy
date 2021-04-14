import React from "react";
import { mount } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";
import Input from "./Input";
import languageContext from "./contexts/languageContext";

const mockSetCurrentGuess = jest.fn();

// mock useState of react module
jest.mock("react", () => ({
	...jest.requireActual("react"),
	useState: (initialState) => [initialState, mockSetCurrentGuess],
}));

const defaultProps = { success: false, secretWord: "" };

const setup = ({ success = false, secretWord = "party", language = "en" }) => {
	return mount(
		<languageContext.Provider value={language}>
			<Input success={success} secretWord={secretWord} />
		</languageContext.Provider>
	);
};

describe("render tests", () => {
	describe("success is true", () => {
		let wrapper;
		beforeEach(() => {
			wrapper = setup({ success: true });
		});
		test("Input renders without error", () => {
			const component = findByTestAttr(wrapper, "component-input");
			expect(component.length).toBe(1);
		});
		test("input box does not show", () => {
			const inputBox = findByTestAttr(wrapper, "input-box");
			expect(inputBox.exists()).toBe(false);
		});
		test("submit button does not show", () => {
			const submitButton = findByTestAttr(wrapper, "submit-button");
			expect(submitButton.exists()).toBe(false);
		});
	});
	describe("success is false", () => {
		let wrapper;
		beforeEach(() => {
			wrapper = setup({ success: false });
		});
		test("Input renders without error", () => {
			const component = findByTestAttr(wrapper, "component-input");
			expect(component.length).toBe(1);
		});
		test("input box does not show", () => {
			const inputBox = findByTestAttr(wrapper, "input-box");
			expect(inputBox.exists()).toBe(true);
		});
		test("submit button does not show", () => {
			const submitButton = findByTestAttr(wrapper, "submit-button");
			expect(submitButton.exists()).toBe(true);
		});
	});
	describe("languagePicker", () => {
		test("should render submit string in english", () => {
			const wrapper = setup({ success: false });
			const submitButton = findByTestAttr(wrapper, "submit-button");
			expect(submitButton.text()).toBe("Submit");
		});
		test("should render submit string in emoji", () => {
			const wrapper = setup({ success: false, language: "emoji" });
			const submitButton = findByTestAttr(wrapper, "submit-button");
			expect(submitButton.text()).toBe("🚀");
		});
	});
});

test("should not throw warning with expected props", () => {
	const expectedProps = defaultProps;
	checkProps(Input, expectedProps);
});

describe("state controlled input field", () => {
	// have to use useReducer to test multiple useStates
	let wrapper;

	beforeEach(() => {
		mockSetCurrentGuess.mockClear();
		wrapper = setup({});
	});
	test("state updates with value of input box upon change", () => {
		const inputBox = findByTestAttr(wrapper, "input-box");

		const mockEvent = { target: { value: "train" } };
		inputBox.simulate("change", mockEvent);

		expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
	});

	test("should clear currentGuess when form is submitted", () => {
		const submitButton = findByTestAttr(wrapper, "submit-button");

		submitButton.simulate("click", { preventDefault: () => {} });

		expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
	});
});

// Below test: tests the behavior and not the implementation so much
// Functional test instead of unit test
// Have to use `useState` in Input.js instead of `React.useState`
// jest.unmock("react"); // unmock the mock at top of this file

// test("input box change should update input box value", () => {
// 	const wrapper = setup();
// 	let inputBox = findByTestAttr(wrapper, "input-box");

// 	const mockEvent = { target: { value: "tuttut" } };
// 	inputBox.simulate("change", mockEvent);

// 	inputBox = findByTestAttr(wrapper, "input-box"); // have to re-grab input on updated wrapper
// 	expect(inputBox.props().value).toBe("tuttut");
// });
