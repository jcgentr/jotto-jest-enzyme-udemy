import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";

jest.mock("./actions");
import { getSecretWord as mockGetSecretWord } from "./actions";
import React from "react";

const setup = () => mount(<App />);

describe.each([
	[null, true, false],
	["party", false, true],
])("renders with secretWord as %s", (secretWord, loadingShows, appShows) => {
	let wrapper;
	let originalUseReducer;
	beforeEach(() => {
		originalUseReducer = React.useReducer;
		const mockUseReducer = jest
			.fn()
			.mockReturnValue([{ secretWord, language: "en" }, jest.fn()]);
		React.useReducer = mockUseReducer;
		wrapper = setup();
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
		const wrapper = setup();
		expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
	});
	test("should not call getSecretWord on app update", () => {
		const wrapper = setup();
		mockGetSecretWord.mockClear();
		wrapper.setProps();
		expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
	});
});
