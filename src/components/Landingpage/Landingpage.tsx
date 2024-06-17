import React from 'react';
import './Landingpage.css';
import { useUserContext } from '../UserContextProvider.js';
import Navbar from '../Navbar/Navbar.tsx';
import Gallery from '../Gallery/Gallery.tsx';

export default function Landingpage() {
	//method to access the ContextAPi
	const { user, setUser } = useUserContext();

	const randomProducts = async () => {
		try {
			const response = await fetch(`http://localhost:3000/products/random`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			setUser({ ...user, search: data });
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			} else {
				alert('An unexpected error occurred');
			}
		}
	};

	React.useEffect(async () => {
		SearchProducts(sanitizedUserInput).then((res) =>
			setUser({ ...user, search: res }),
		);
	}, []);

	return (
		<>
			<header>
				<Navbar />
			</header>
			<main>
				<Gallery products={user?.search} />
			</main>
			<footer>
				<p>this is where some sort of cool footer will go</p>
			</footer>
		</>
	);
}
