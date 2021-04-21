import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";

import NewWordButton from "./NewWordButton";
import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";

const setup = ({ success = false }) => {
	return mount(
		<guessedWordsContext.GuessedWordsProvider>
			<successContext.SuccessProvider value={[success, jest.fn()]}>
				<NewWordButton />
			</successContext.SuccessProvider>
		</guessedWordsContext.GuessedWordsProvider>
	);
};

test("should render with error", () => {
	const wrapper = setup({});
	expect(wrapper.exists()).toBeTruthy();
});
test("should display after successful game", () => {
	const wrapper = setup({ success: true });
	const newWordBtn = findByTestAttr(wrapper, "new-word-btn");
	expect(newWordBtn.length).toBe(1);
});
test("should not display if game not successful", () => {
	const wrapper = setup({ success: false });
	const newWordBtn = findByTestAttr(wrapper, "new-word-btn");
	expect(newWordBtn.length).toBe(0);
});
