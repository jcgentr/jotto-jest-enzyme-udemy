import { shallow } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";

const setup = () => shallow(<App />);

test("App renders without error", () => {
	const wrapper = setup();
	const appComponent = findByTestAttr(wrapper, "component-app");
	expect(appComponent).toHaveLength(1);
});
