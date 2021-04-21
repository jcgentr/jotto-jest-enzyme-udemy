import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";

import hookActions from "./actions/index";

const mockGetSecretWord = jest.fn().mockResolvedValue(false);

const setup = (secretWord = "party") => {
	mockGetSecretWord.mockClear();
	hookActions.getSecretWord = mockGetSecretWord;

	const mockUseReducer = jest
		.fn()
		.mockReturnValue([{ secretWord, language: "en" }, jest.fn()]);

	React.useReducer = mockUseReducer;

	// use mount, because useEffect not called on `shallow`
	// https://github.com/airbnb/enzyme/issues/2086
	return mount(<App />);
};

describe.each([
	[null, true, false],
	["party", false, true],
])("renders with secretWord as %s", (secretWord, loadingShows, appShows) => {
	let wrapper;
	let originalUseReducer;

	beforeEach(() => {
		originalUseReducer = React.useReducer;
		wrapper = setup(secretWord);
	});
	afterEach(() => {
		React.useReducer = originalUseReducer;
	});

	test(`should render loading spinner: ${loadingShows}`, () => {
		const spinnerComponent = findByTestAttr(wrapper, "spinner");
		expect(spinnerComponent.exists()).toBe(loadingShows);
	});
	test(`should render app: ${appShows}`, () => {
		const appComponent = findByTestAttr(wrapper, "component-app");
		expect(appComponent.exists()).toBe(appShows);
	});
});

describe("get secret word", () => {
	beforeEach(() => {
		mockGetSecretWord.mockClear();
	});
	test("should call getSecretWord on app mount", () => {
		const wrapper = setup(null);
		expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
	});
	test("should not call getSecretWord on app update", () => {
		const wrapper = setup(null);
		mockGetSecretWord.mockClear();
		wrapper.setProps();
		expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
	});
});
