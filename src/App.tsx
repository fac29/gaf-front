//import React from 'react';
import Landingpage from './components/Landingpage/Landingpage';
import ProductPage from './components/Productpage/ProductPage';
import Card from './components/Card/Card';

export default function App() {
	return (
		<>
			<Landingpage />
			<ProductPage />

			<Card
				image="../public/Images/image.jpeg"
				name="Kenny G"
				description="He will melt your underwear."
				price={39.99}
			/>
			<Card name="Another Product" price={29.99} />
		</>
	);
}
