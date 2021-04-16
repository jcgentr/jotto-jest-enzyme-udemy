import React from "react";

const successContent = React.createContext();

const useSuccess = () => {
	const context = React.useContext(successContent);

	if (!context)
		throw new Error("useSuccess must be used within a SuccessProvider");

	return context;
};

const SuccessProvider = (props) => {
	const [success, setSuccess] = React.useState(false);

	const value = React.useMemo(() => [success, setSuccess], [success]);

	return <successContent.Provider value={value} {...props} />;
};

export default { SuccessProvider, useSuccess };
