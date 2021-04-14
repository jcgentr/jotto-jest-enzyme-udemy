import { shallow, mount } from "enzyme";

import Congrats from "./Congrats";
import { checkProps, findByTestAttr } from "../test/testUtils";
import languageContext from "./contexts/languageContext";

const setup = ({ success = false, language = "en" }) => {
	return mount(
		<languageContext.Provider value={language}>
			<Congrats success={success} />
		</languageContext.Provider>
	);
};

describe("languagePicker", () => {
	test("should render congrats string in english", () => {
		const wrapper = setup({ success: true });
		expect(wrapper.text()).toBe("Congratulations! You guessed the word!");
	});
	test("should render congrats string in emoji", () => {
		const wrapper = setup({ success: true, language: "emoji" });
		expect(wrapper.text()).toBe("🎯🎉");
	});
});

test("should render without error", () => {
	const wrapper = setup({});
	const component = findByTestAttr(wrapper, "component-congrats");
	expect(component.length).toBe(1);
});
test("should render no text when `success` prop is false", () => {
	const wrapper = setup({ success: false });
	const component = findByTestAttr(wrapper, "component-congrats");
	expect(component.text()).toBe("");
});
test("should render non-empty congrats message when `success` prop is true", () => {
	const wrapper = setup({ success: true });
	const message = findByTestAttr(wrapper, "congrats-message");
	expect(message.text().length).not.toBe(0);
});
test("should not throw warning with expected props", () => {
	const expectedProps = { success: false };
	checkProps(Congrats, expectedProps);
});
