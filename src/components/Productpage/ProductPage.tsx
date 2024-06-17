import './ProductPage.css';
import ImgDisplay from '../ImgDisplay/ImgDisplay';
import { useParams } from 'react-router-dom';
import Button from '../Button/Button';
import Navbar from '../Navbar/Navbar';
import { singleProduct } from '../../utils/endpoints';
import { useEffect, useState } from 'react';
import { Product } from '../../utils/tyBucket';

export default function ProductPage() {
	const [product, setProduct] = useState<Product | null>(null);
	const { id } = useParams();
	
	const handleAddToBasket = () => {
		if (product) {
			console.log(`Added product ${product.id} to cart`);
		} else {
			console.log('Product is null, cannot add to cart');
		}
	};

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const productData = await singleProduct(Number(id));

				if (Array.isArray(productData) && productData.length > 0) {
					setProduct(productData[0]); // Access the first element of the array
				} else {
					console.error('Product data is not in expected format:', productData);
				}
			} catch (error) {
				console.error('Error fetching product:', error);
			}
		};

		fetchProduct();
	}, [id]);

	return (
		<>
			<header>
				<Navbar />
			</header>
			<main>
				<h1>Product Page</h1>
				{product ? (
					<>
						<ImgDisplay
							image={product.image_path || '../Images/placeholder-image.jpg'}
							size="big"
						/>
						<p>{product.name}</p>
						<p>{product.description}</p>
						<p>{`Price: $${product.price}`}</p>
					</>
				) : (
					<p>Loading...</p>
				)}
				<Button
					btnText="Add to basket"
					btnonClick={handleAddToBasket}
					btnclassName="btnSecondary"
				/>
			</main>

			<footer>
				<p>this is where some sort of cool footer will go</p>
			</footer>
		</>
	);
}
