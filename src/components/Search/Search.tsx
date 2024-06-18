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

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		const sanitizedUserInput = sanitizeInput(userInput);

		try {
			const response = await SearchProducts(sanitizedUserInput);
			if (typeof response === 'string') {
				alert(
					`The search for product: ${sanitizedUserInput} was unsuccessful. Server message: ${response}`,
				);
			} else {
				setUser({ ...user, search: response } as User);
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			} else {
				alert('An unexpected error occurred');
			}
		}

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
