import { shallow } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import Input from "./Input";

const setup = () => shallow(<Input />);

test("Input renders without error", () => {
	const wrapper = setup();
	const component = findByTestAttr(wrapper, "component-input");
	expect(component.length).toBe(1);
});
