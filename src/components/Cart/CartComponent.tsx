//import React from 'react';
import './CartComponent.css';
import { useUserContext } from '../UserContextProvider';
import CartItemComponent from '../CartItemComponent/CartItemComponent';

export default function CartComponent(handleModalToggle: () => void) {
	const { user } = useUserContext();

	return (
		<div className="cartycart">
			<div className="cartbody">
				<div onClick={() => handleModalToggle.handleModalToggle()}>
					<p>back</p>
				</div>
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
