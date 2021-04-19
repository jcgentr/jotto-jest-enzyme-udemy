import { shallow, mount } from "enzyme";
import guessedWordsContext from "./guessedWordsContext";

// for testing purposes
const FunctionComponent = () => {
	guessedWordsContext.useGuessedWords();
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
			<guessedWordsContext.GuessedWordsProvider>
				<FunctionComponent />
			</guessedWordsContext.GuessedWordsProvider>
		)
	).not.toThrow();
});
