//import React from 'react';
import { useUserContext } from '../UserContextProvider';
import Button from '../Button/Button';
import ImgDisplay from '../ImgDisplay/ImgDisplay';
import { Cart, CartItem } from '../../utils/tyBucket';

export default function CartItemComponent({ id, quantity, name, pic }) {
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
		<div>
			<ImgDisplay
				look={'cartimage'}
				imgurl={pic || '../Images/placeholder-image.jpg'}
			/>
			<p>{name}</p>
			<Button
				btnText="-"
				btnonClick={() => handleDecrementCart(id)}
				btnclassName="btnPrimary"
			/>
			<p>{quantity}</p>
			<Button
				btnText="+"
				btnonClick={() => handleAddToCart(id)}
				btnclassName="btnPrimary"
			/>
		</div>
	);
}
