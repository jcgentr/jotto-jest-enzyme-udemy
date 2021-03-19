export const findByTestAttr = (wrapper, val) => {
	return wrapper.find(`[data-test='${val}']`);
};

export const findByTestAttrAndClick = (wrapper, val) => {
	wrapper.find(`[data-test=${val}]`).simulate("click");
};
