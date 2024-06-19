//import React from 'react';
import './CartComponent.css';
import { useUserContext } from '../UserContextProvider';
import CartItemComponent from '../CartItemComponent/CartItemComponent';

export default function CartComponent(modalIsOpen: boolean) {
	const { user } = useUserContext();

	return (
		<>
			{modalIsOpen ? (
				<div className="cartycart">
					<h6>Shopping Cart</h6>
					<div>
						{user && user.cart.length > 0 ? (
							user.cart.map((item) => (
								<div key={item.productId}>
									<CartItemComponent
										id={item.productId}
										quantity={item.quantity}
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
			) : (
				''
			)}
		</>
	);
}
