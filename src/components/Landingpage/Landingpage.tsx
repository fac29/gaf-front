//import React from 'react';
import './Landingpage.css';
import { useUserContext } from '../UserContextProvider.js';
import Navbar from '../Navbar/Navbar.tsx';
import Card from '../Card/Card';

export default function Landingpage() {
	//method to access the ContextAPi
	const { user, setUser } = useUserContext();

	return (
		<>
			<header>
				<Navbar />
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
				<div>
					<p>example card</p>
					<Card
						id={1}
						image={
							'https://www.shutterstock.com/image-vector/vector-realistic-isolated-neon-sign-260nw-726184279.jpg'
						}
						name={'ting the ting'}
						description={'yolo swagins big ting'}
						price={5}
					/>
				</div>
			</main>
			<footer>
				<p>this is where some sort of cool footer will go</p>
			</footer>
		</>
	);
}
