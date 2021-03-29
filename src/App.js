import React from "react";
import Input from "./Input";

function App() {
	return (
		<div data-test='component-app' className='container'>
			<Input success={false} secretWord='' />
		</div>
	);
}

export default App;
