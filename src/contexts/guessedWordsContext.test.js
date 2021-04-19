import { shallow, mount } from "enzyme";
import { GuessedWordsProvider, useGuessedWords } from "./guessedWordsContext";

// for testing purposes
const FunctionComponent = () => {
	useGuessedWords();
	return <div />;
};

test("should throw error when useGuessedWords is not wrapped in GuessedWordsProvider", () => {
	expect(() => shallow(<FunctionComponent />)).toThrow(
		"useGuessedWords must be used within a GuessedWordsProvider"
	);
});
test("should not throw error when useGuessedWords is wrapped in GuessedWordsProvider", () => {
	expect(() =>
		mount(
			<GuessedWordsProvider>
				<FunctionComponent />
			</GuessedWordsProvider>
		)
	).not.toThrow();
});
