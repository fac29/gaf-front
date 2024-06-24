import React from 'react';
import './CartItemComponent.css';
import { useUserContext } from '../UserContextProvider';
import ImgDisplay from '../ImgDisplay/ImgDisplay';
import { CartItem, Product } from '../../utils/tyBucket';
import { singleProduct } from '../../utils/endpoints';
import { CiSquarePlus, CiSquareMinus, CiSquareRemove } from 'react-icons/ci';

export default function CartItemComponent({ productId, quantity }: CartItem) {
	const { user, setUser } = useUserContext();
	const [prodDeets, setProdDeets] = React.useState<Product>();

	//adding products to userCart
	const handleAddToCart = (productId: number) => {
		if (user) {
			const updatedCart: CartItem[] = [...user.cart];
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

	const handleDecrementCart = (productId: number) => {
		if (user) {
			const updatedCart: CartItem[] = [...user.cart];
			const existingCartItemIndex: number = updatedCart.findIndex(
				(item) => item.productId === productId,
			);

			if (existingCartItemIndex !== -1) {
				if (updatedCart[existingCartItemIndex].quantity === 1) {
					updatedCart.splice(existingCartItemIndex, 1);
				} else {
					updatedCart[existingCartItemIndex].quantity -= 1;
				}

				setUser({ ...user, cart: updatedCart });
			}
		}
	};

	const fetchProductInfo = async (productId: number) => {
		try {
			const productData = await singleProduct(productId);

			if (Array.isArray(productData) && productData.length > 0) {
				setProdDeets(productData[0]); // Access the first element of the array
			} else {
				console.error('Product data is not in expected format:', productData);
			}
		} catch (error) {
			console.error('Error fetching product:', error);
		}
	};

	React.useEffect(() => {
		fetchProductInfo(productId);
	}, []);

	return (
		<div key={productId} className="cartitembox">
			<div className="leftcartitembox">
				<ImgDisplay
					look={'cartimage'}
					imgurl={
						prodDeets ? prodDeets.image_path : '../Images/placeholder-image.jpg'
					}
				/>
				<p>{prodDeets ? prodDeets.name : 'no product name'}</p>
			</div>
			<div className="rightcartitembox">
				{quantity === 1 ? (
					<CiSquareRemove
						color="darkred"
						size="30px"
						className="btnMinimal"
						onClick={() => handleDecrementCart(productId)}
					/>
				) : (
					<CiSquareMinus
						size="30px"
						className="btnMinimal"
						onClick={() => handleDecrementCart(productId)}
					/>
				)}

				<p>{quantity ? quantity : 'no product quantity'}</p>
				<CiSquarePlus
					size="30px"
					className="btnMinimal"
					onClick={() => handleAddToCart(productId)}
				/>
			</div>
		</div>
	);
}
