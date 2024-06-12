//import React from 'react';
import './Landingpage.css';
import { useUserContext } from '../UserContextProvider.js';

export default function Landingpage() {
	//method to access the ContextAPi
	const { user, setUser } = useUserContext();

	return (
		<>
			<header>
				<p>this is where the nav and search will go</p>
			</header>
			<main>
				<h1>Landing Page</h1>
				<h3>{user ? user.name : 'user set to null'}</h3>
				<h4>{user ? user.role : 'user set to null'}</h4>
				<h5>{user ? user.username : 'user set to null'}</h5>

				{/* these are examples of hown to use the context api inside the components */}
				<button
					onClick={() =>
						setUser((prevUser) => ({
							...(prevUser || { role: '', name: '', username: '', cart: [] }),
							role: 'admin',
							name: 'gui',
							username: 'gafgui',
							cart: prevUser?.cart || [],
						}))
					}
				>
					click me
				</button>
				{/* these are examples of hown to use the context api inside the components */}
				<button
					onClick={() =>
						setUser({
							...user,
							role: 'client',
							name: 'ferg',
							username: 'alex',
							cart: user?.cart || [],
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
