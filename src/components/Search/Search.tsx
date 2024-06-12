import React from 'react';
import './Search.css';
import Button from '../Button/Button';
import { sanitizeInput } from '../../utils/utils';

export default function Search() {
	const [userInput, setUserInput] = React.useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Form submitted with userInput:', userInput);
		console.log(`Sanitized user input ${sanitizeInput(userInput)}`);

		// Add handler to send the data to search
		setUserInput('');
	};

	return (
		<form
			onChange={(e) => setUserInput(e.target.value)}
			onSubmit={handleSubmit}
		>
			<label>
				Search:
				<input value={userInput} />
			</label>
			<Button btnText="Search" btnclassName="searchButton" />
		</form>
	);
}
