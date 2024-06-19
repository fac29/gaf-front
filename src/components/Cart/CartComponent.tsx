//import React from 'react'
import './CartComponent.css';
import { useUserContext } from '../UserContextProvider';
import Button from '../Button/Button';
import ImgDisplay from '../ImgDisplay/ImgDisplay';
import { Cart, CartItem } from '../../utils/tyBucket';

export default function CartComponent() {
	const { user, setUser } = useUserContext();

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

	return (
		<div className="cartycart">
			<h6>Shopping Cart</h6>
			<div>
				{user && user.cart.length > 0 ? (
					user.cart.map((item) => (
						<div key={item.productId}>
							<ImgDisplay
								look={'cartimage'}
								imgurl={item.image_path || '../Images/placeholder-image.jpg'}
							/>
							<p>{item.name}</p>
							<Button
								btnText="-"
								btnonClick={() => handleDecrementCart(item.productId)}
								btnclassName="btnPrimary"
							/>
							<p>{item.quantity}</p>
							<Button
								btnText="+"
								btnonClick={() => handleAddToCart(item.productId)}
								btnclassName="btnPrimary"
							/>
						</div>
					))
				) : (
					<div>
						<p>your cart is empty</p>
					</div>
				)}
			</div>
		</div>
	);
}
