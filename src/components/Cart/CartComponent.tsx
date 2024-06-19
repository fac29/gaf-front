//import React from 'react';
import './CartComponent.css';
import { useUserContext } from '../UserContextProvider';
import CartItemComponent from '../CartItemComponent/CartItemComponent';

export default function CartComponent(handleModalToggle: () => void) {
	const { user } = useUserContext();

	return (
		<div
			className="cartycart"
			onClick={() => handleModalToggle.handleModalToggle()}
		>
			<div className="cartbody">
				{user && user.cart.length > 0 ? (
					user.cart.map((item) => (
						<div key={item.productId}>
							<CartItemComponent id={item.productId} quantity={item.quantity} />
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
