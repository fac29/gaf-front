import React from 'react';
import './CartItemComponent.css';
import { useUserContext } from '../UserContextProvider';
import Button from '../Button/Button';
import ImgDisplay from '../ImgDisplay/ImgDisplay';
import { Cart, CartItem } from '../../utils/tyBucket';
import { singleProduct } from '../../utils/endpoints';
import { CiSquarePlus, CiSquareMinus, CiSquareRemove } from 'react-icons/ci';

export default function CartItemComponent({ id, quantity }) {
	const { user, setUser } = useUserContext();
	const [prodDeets, setProdDeets] = React.useState();

	const handleAddToCart = (productId: number) => {
		if (user) {
			const updatedCart: Cart[] = [...user.cart];
			const existingCartItem: CartItem | undefined = updatedCart.find(
				(item) => item.productId === productId,
			);

			if (existingCartItem) {
				existingCartItem.quantity += 1;
			} else {
				updatedCart.push({ productId, quantity: 1 } as CartItem);
			}

			setUser({ ...user, cart: updatedCart });
		}
	};

	const handleDecrementCart = (productId: number) => {
		if (user) {
			const updatedCart: Cart[] = [...user.cart];
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

	const fetchProductInfo = async (prodid) => {
		try {
			const productData = await singleProduct(prodid);

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
		fetchProductInfo(id);
	}, []);

	return (
		<div key={id} className="cartitembox">
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
				{/* <Button
					btnText="-"
					btnonClick={() => handleDecrementCart(id)}
					btnclassName="btnMinimal"
				/> */}
				{quantity === 1 ? (
					<CiSquareRemove
						color="darkred"
						size="30px"
						className="btnMinimal"
						onClick={() => handleDecrementCart(id)}
					/>
				) : (
					<CiSquareMinus
						size="30px"
						className="btnMinimal"
						onClick={() => handleDecrementCart(id)}
					/>
				)}

				<p>{quantity ? quantity : 'no product quantity'}</p>
				<CiSquarePlus
					size="30px"
					className="btnMinimal"
					onClick={() => handleAddToCart(id)}
				/>
			</div>
		</div>
	);
}