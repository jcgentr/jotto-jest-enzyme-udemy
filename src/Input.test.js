import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";
import Input from "./Input";

const mockSetCurrentGuess = jest.fn();

// mock useState of react module
jest.mock("react", () => ({
	...jest.requireActual("react"),
	useState: (initialState) => [initialState, mockSetCurrentGuess],
}));

const defaultProps = { secretWord: "" };

const setup = (props = {}) => {
	const setupProps = { ...defaultProps, ...props };
	return shallow(<Input {...setupProps} />);
};

test("Input renders without error", () => {
	const wrapper = setup();
	const component = findByTestAttr(wrapper, "component-input");
	expect(component.length).toBe(1);
});

test("should not throw warning with expected props", () => {
	const expectedProps = { secretWord: "" };
	checkProps(Input, expectedProps);
});

describe("state controlled input field", () => {
	// have to use useReducer to test multiple useStates
	let wrapper;

	beforeEach(() => {
		mockSetCurrentGuess.mockClear();
		wrapper = setup();
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
