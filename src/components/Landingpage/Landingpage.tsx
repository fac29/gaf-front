//import React from 'react';
import './Landingpage.css';
import { useUserContext } from '../UserContextProvider.js';

export default function Landingpage() {
	const { user, setUser } = useUserContext();

	return (
		<>
			<header>
				<p>this is where the nav and search will go</p>
			</header>
			<main>
				<h1>Landing Page</h1>
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
			</main>
			<footer>
				<p>this is where some sort of cool footer will go</p>
			</footer>
		</>
	);
}
