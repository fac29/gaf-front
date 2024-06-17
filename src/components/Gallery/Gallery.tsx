//import React from 'react';
import './Gallery.css';
import { Product } from '../../utils/tyBucket';
import Card from '../Card/Card';

export default function Gallery({ products }: { products: Product[] }) {
	//if statement to check if products exist and its length
	if (products.length > 0) {
		return (
			<div className="gallery">
				{products.map((product) => (
					//use card component to display item
					<Card
						key={product.id}
						id={product.id}
						image={product.image}
						name={product.name}
						description={product.description}
						price={product.price}
					/>
				))}
			</div>
		);
	} else {
		return <p>no products to display</p>;
	}
}
