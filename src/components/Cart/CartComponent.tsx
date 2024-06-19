//import React from 'react'
import './CartComponent.css';
import { useUserContext } from '../UserContextProvider';
import CartItemComponent from '../CartItemComponent/CartItemComponent';

export default function CartComponent() {
	const { user } = useUserContext();

	return (
		<div className="cartycart">
			<h6>Shopping Cart</h6>
			<div>
				{user && user.cart.length > 0 ? (
					user.cart.map((item) => (
						<CartItemComponent
							key={item.productId}
							id={item.productId}
							quantity={item.quantity}
							name={item.name}
							pic={item.image_path}
						/>
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
