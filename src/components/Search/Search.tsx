import React from 'react';
import './Search.css';
import { sanitizeInput } from '../../utils/utils';

export default function Search() {
	const [userInput, setUserInput] = React.useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(userInput);
		console.log(`Sanitized user input ${sanitizeInput(userInput)}`);
		setUserInput('');
	};

	return (
		<form
			method="post"
			onChange={(e) => setUserInput(e.target.value)}
			onSubmit={handleSubmit}
		>
			<label>
				Search:
				<input defaultValue={userInput} />
			</label>
			<button type="submit">Search</button>
		</form>
	);
}
