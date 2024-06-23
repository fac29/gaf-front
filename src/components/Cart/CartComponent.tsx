//import React from 'react';
import  { useEffect } from 'react';
import './CartComponent.css';
import { useUserContext } from '../UserContextProvider';
import CartItemComponent from '../CartItemComponent/CartItemComponent';
import { IoMdCloseCircle } from 'react-icons/io';

export default function CartComponent({ handleModalToggle }) {
	const { user } = useUserContext();

	useEffect(() => {
		if (user && user.cart.length === 0) {
			handleModalToggle();
		}
	}, [user, handleModalToggle]);

	const handleClickOutside = (event) => {
		if (event.target.classList.contains('cartycart')) {
			handleModalToggle();
		}
	};

	return (
		<div className="cartycart" onClick={handleClickOutside}>
			<div className="cartbody">
				{/* <div>
					<IoMdCloseCircle
						color="darkred"
						size="2rem"
						onClick={handleModalToggle}
					/>
				</div> */}
				{user && user.cart.length > 0 ? (
					user.cart.map((item) => (
						<div key={item.productId} className="cart-item">
							<CartItemComponent id={item.productId} quantity={item.quantity} />
						</div>
					))
				) : (
					<div>
						<p>Your cart is empty</p>
					</div>
				)}
			</div>
		</div>
	);
}