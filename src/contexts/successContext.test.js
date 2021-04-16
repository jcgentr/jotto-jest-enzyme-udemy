import { shallow, mount } from "enzyme";
import successContext from "./successContext";

// for testing purposes
const FunctionComponent = () => {
	successContext.useSuccess();
	return <div />;
};

test("should throw error when useSuccess is not wrapped in SuccessProvider", () => {
	expect(() => shallow(<FunctionComponent />)).toThrow(
		"useSuccess must be used within a SuccessProvider"
	);
});
test("should not throw error when useSuccess is wrapped in SuccessProvider", () => {
	expect(() =>
		mount(
			<successContext.SuccessProvider>
				<FunctionComponent />
			</successContext.SuccessProvider>
		)
	).not.toThrow();
});
