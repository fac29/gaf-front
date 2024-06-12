//import React from 'react';
import Landingpage from './components/Landingpage/Landingpage';
import ProductPage from './components/Productpage/ProductPage';
import Gallery from './components/Gallery/Gallery';

const products = [
	{
		image: 'https://via.placeholder.com/300',
		name: 'Product 1',
		description: 'This is the description for product 1.',
		price: 19.99,
	},
	{
		image: '../public/Images/image.jpeg',
		name: 'Product 2',
		description: 'This is the description for product 2.',
		price: 29.99,
	},
	{
		image: 'https://via.placeholder.com/300',
		name: 'Product 3',
		description: 'This is the description for product 3.',
		price: 39.99,
	},
	{
		image: 'https://via.placeholder.com/300',
		name: 'Product 1',
		description: 'This is the description for product 1.',
		price: 19.99,
	},
	{
		image: '../public/Images/image.jpeg',
		name: 'Product 2',
		description: 'This is the description for product 2.',
		price: 29.99,
	},
	{
		image: 'https://via.placeholder.com/300',
		name: 'Product 3',
		description: 'This is the description for product 3.',
		price: 39.99,
	},
	{
		image: 'https://via.placeholder.com/300',
		name: 'Product 1',
		description: 'This is the description for product 1.',
		price: 19.99,
	},
	{
		image: '../public/Images/image.jpeg',
		name: 'Product 2',
		description: 'This is the description for product 2.',
		price: 29.99,
	},
	{
		image: 'https://via.placeholder.com/300',
		name: 'Product 3',
		description: 'This is the description for product 3.',
		price: 39.99,
	},
];

export default function App() {
	return (
		<>
			<Landingpage />
			<ProductPage />
			<Gallery products={products} />
		</>
	);
}
