import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";

jest.mock("./actions");
import { getSecretWord as mockGetSecretWord } from "./actions";

const setup = () => mount(<App />);

test("App renders without error", () => {
	const wrapper = setup();
	const appComponent = findByTestAttr(wrapper, "component-app");
	expect(appComponent).toHaveLength(1);
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
