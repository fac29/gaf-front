import './ProductPage.css';
import ImgDisplay from '../ImgDisplay/ImgDisplay';
import { useParams } from 'react-router-dom';
import Button from '../Button/Button';
import Navbar from '../Navbar/Navbar';
import {
	singleProduct,
	fetchReviews,
	fetchProductScore,
} from '../../utils/endpoints';
import { useEffect, useState } from 'react';
import { Product, Review, CartItem } from '../../utils/tyBucket';
import Reviews from '../Reviews/Reviews';
import { useUserContext } from '../UserContextProvider';
import ReviewsScore from '../Reviews/ReviewsScore/ReviewsScore';

export default function ProductPage() {
	const [product, setProduct] = useState<Product | null>(null);
	const [reviews, setReviews] = useState<Review[]>([]);
	const [productScore, setProductScore] = useState<number | null>(null);

	//calling the customHook for the contextAPI function
	const { user, setUser } = useUserContext();
	const { id } = useParams();

	const fetchProductReviews = async (prodId: number) => {
		try {
			const reviewsData = await fetchReviews(prodId);
			if (Array.isArray(reviewsData)) {
				setReviews(reviewsData);
			} else {
				//console.error('Reviews data is not in expected format:', reviewsData);
				setReviews([]);
			}
		} catch (error) {
			console.error('Error fetching reviews:', error);
		}
	};

	//adding products to userCart
	const handleAddToCart = (productId: number) => {
		if (user) {
			//const updatedCart: CartItem[] = [...user.cart];
			const updatedCart: CartItem[] = user.cart ? user.cart.flatMap(e => e.cart) : [];
			const existingCartItem: CartItem | undefined = updatedCart.find(
				(element) => element.productId === productId,
			);

			if (existingCartItem) {
				existingCartItem.quantity += 1;
			} else {
				updatedCart.push({ productId, quantity: 1 } as CartItem);
			}

			setUser({ ...user, cart: updatedCart });
			console.log(`Added product ${productId} to cart`);
			console.log(user.cart);
		}
	};

	const fetchProduct = async (prodId: number) => {
		try {
			const productData = await singleProduct(prodId);

			if (Array.isArray(productData) && productData.length > 0) {
				setProduct(productData[0]); // Access the first element of the array
			} else {
				console.error('Product data is not in expected format:', productData);
			}
		} catch (error) {
			console.error('Error fetching product:', error);
		}
	};

	const fetchProductScores = async (prodId: number) => {
		try {
			const scoreData = await fetchProductScore(prodId);

			setProductScore(scoreData.average_score);
			console.log(`ProductScore: ${scoreData.average_score}`);
		} catch (error) {
			console.error('Error fetching product score:', error);
		}
	};

	useEffect(() => {
		const productId = Number(id);
		if (isNaN(productId)) {
			console.error('Invalid product ID');
			return;
		}

		fetchProduct(productId);
		fetchProductReviews(productId);
		fetchProductScores(productId);
	}, [id]);

	return (
		<>
			<header>
				<Navbar hasSearch={false} />
			</header>
			<main>
				<div className="productContainer">
					{product ? (
						<>
							<h1>{product.name}</h1>
							<ImgDisplay
								imgurl={product.image_path || '../Images/placeholder-image.jpg'}
								look="productImage"
							/>
							<p>{product.name}</p>
							<p>{product.description}</p>
							<p>{`£${product.price}`}</p>
							{productScore !== null ? (
								<div className="averageScore">
									<p>Average Score:</p>
									<ReviewsScore score={productScore} />
								</div>
							) : (
								<p>No reviews for this item</p>
							)}
						</>
					) : (
						<p>Loading...</p>
					)}
					<div className="addToBasketButton">
						<Button
							btnText="Add to basket"
							btnonClick={() => handleAddToCart(Number(id))}
							btnclassName="btnPrimary"
						/>
					</div>
					{reviews.length >= 1 && <Reviews reviewsArray={reviews} />}
				</div>
			</main>
			<footer>
				<p>Buy stuff if you want to be happy</p>
			</footer>
		</>
	);
}
