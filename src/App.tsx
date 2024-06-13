//import React from 'react';
import Landingpage from './components/Landingpage/Landingpage';
import ProductPage from './components/Productpage/ProductPage';

export default function App() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const fetchedProducts = await randomProducts();
				setProducts(fetchedProducts);
			} catch (error) {
				console.error('Failed to fetch products:', error);
			}
		};

		fetchProducts();
	}, []);

	return (
		<BasketProvider>
			<Landingpage />
			<ProductPage />
			<Gallery products={products} />
		</BasketProvider>
	);
}
