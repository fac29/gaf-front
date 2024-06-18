import React from 'react';
import './Search.css';
import Button from '../Button/Button';
import { sanitizeInput } from '../../utils/utils';
import { SearchProducts } from '../../utils/endpoints';
import { useUserContext } from '../UserContextProvider';
import { User } from '../../utils/tyBucket';

export default function Search() {
	const [userInput, setUserInput] = React.useState('');
	const { user, setUser } = useUserContext();

	const handleSubmit = (e: Event) => {
		e.preventDefault();

		console.log('Form submitted with userInput:', userInput);
		console.log(`Sanitized user input ${sanitizeInput(userInput)}`);

		// Handler to send the data to search
		const sanitizedUserInput = sanitizeInput(userInput);
		SearchProducts(sanitizedUserInput).then((res) =>
			setUser({ ...user, search: res }),
		);

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
			<Button btnText="Search" btnclassName="btnPrimary" />
		</form>
	);
}
