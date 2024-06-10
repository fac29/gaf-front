//import React from 'react';
import './Landingpage.css';
import { useUserContext } from '../UserContextProvider.js';

export default function Landingpage() {
	const { user, setUser } = useUserContext();

	return (
		<div>
			<h1>Landingpage</h1>
			<h3>{user ? user.name : 'user set to null'}</h3>
			<button
				onClick={() =>
					setUser({
						typeofuser: 'user',
						name: 'user',
						email: 'user',
						cart: [],
					})
				}
			>
				click me
			</button>
		</div>
	);
}
