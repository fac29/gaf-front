//import React from 'react';
import Landingpage from './components/Landingpage/Landingpage';
import ProductPage from './components/Productpage/ProductPage';
import ImgDisplay from './components/ImgDisplay/ImgDisplay';

export default function App() {
	return (
		<>
			<Landingpage />
			<ProductPage />
			{/* <ImgDisplay size={'small'} image={'/Images/image.jpeg'} />
			<ImgDisplay
				size={'small'}
				image={
					'https://i1.sndcdn.com/artworks-000067630056-afxn9j-t240x240.jpg'
				}
			/> */}
		</>
	);
}
