import React from 'react';
import './Landingpage.css';
import { useUserContext } from '../UserContextProvider.js';
import Navbar from '../Navbar/Navbar.tsx';
import Gallery from '../Gallery/Gallery.tsx';
import { randomProducts } from '../../utils/endpoints.js';

export default function Landingpage() {
	//method to access the ContextAPi
	const { user, setUser } = useUserContext();

	const randomProductsHandler = async () => {
		try {
			const response = await randomProducts();
			
			setUser((prevUser) => {
				if (!prevUser) {
					return { role: '', name: '', username: '', cart: [], search: response };
				}
				return { ...prevUser, search: response };
			});



		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			} else {
				alert('An unexpected error occurred');
			}
		}
	};

	React.useEffect(() => {
		randomProductsHandler();
	}, []);

	return (
		<>
			<header>
				<Navbar />
			</header>
			<main>
				{user && user.search && user.search.length > 0 ? (
					<Gallery products={user.search} />
				) : (
					<p>there are no matching products</p>
				)}
			</main>
			<footer>
				<p>Keep buying useless stuff</p>
			</footer>
		</>
	);
}
