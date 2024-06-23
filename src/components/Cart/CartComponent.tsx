//import React from 'react';
import './CartComponent.css';
import { useUserContext } from '../UserContextProvider';
import CartItemComponent from '../CartItemComponent/CartItemComponent';
import { IoMdCloseCircle } from 'react-icons/io';

export default function CartComponent({ handleModalToggle }) {
	const { user } = useUserContext();

	return (
		<div className="cartycart">
			<div className="cartbody">
				<div>
					<IoMdCloseCircle
						color="red"
						size="2rem"
						onClick={handleModalToggle}
					/>
				</div>
				{user && user.cart.length > 0 ? (
					user.cart.map((item) => (
						<div key={item.productId} className="cart-item">
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
