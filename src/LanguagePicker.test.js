import React from "react";
import { shallow } from "enzyme";

import LanguagePicker from "./LanguagePicker";
import { findByTestAttr, checkProps } from "../test/testUtils";

const mockSetLanguage = jest.fn();

const setup = () => {
	return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
};

test("should render without error", () => {
	const wrapper = setup();
	const component = findByTestAttr(wrapper, "component-language-picker");
	expect(component.exists()).toBeTruthy();
});
test("should not throw warning with expected props", () => {
	checkProps(LanguagePicker, { setLanguage: jest.fn() });
});
test("should render non-zero language icons", () => {
	const wrapper = setup();
	const languageIcons = findByTestAttr(wrapper, "language-icon");
	expect(languageIcons.length).toBeGreaterThan(0);
});
test("should call setLanguage prop upon click", () => {
	const wrapper = setup();
	const languageIcons = findByTestAttr(wrapper, "language-icon");
	const firstIcon = languageIcons.first();
	firstIcon.simulate("click");
	expect(mockSetLanguage).toBeCalled();
});
