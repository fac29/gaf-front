//import React from 'react';
import { useEffect } from 'react';
import './CartComponent.css';
import { useUserContext } from '../UserContextProvider';
import CartItemComponent from '../CartItemComponent/CartItemComponent';
import { CartComponentProps } from '../../utils/tyBucket';
import { fetchCreateCart, fetchUpdateCart } from '../../utils/endpoints';

export default function CartComponent({
	handleModalToggle,
}: CartComponentProps) {
	const { user } = useUserContext();

	useEffect(() => {
		if (user?.cart && user.cart.length === 0) {
			handleModalToggle();
		}
	}, [user, handleModalToggle]);

	const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
		if (
			event.target instanceof HTMLDivElement &&
			event.target.classList.contains('cartycart')
		) {
			handleModalToggle();
		}
	};

	const gloryToAFG = async () => {
		try {
			const createUserCart = await fetchCreateCart(420);
			const createProductCart = await fetchUpdateCart(
				createUserCart,
				user?.cart,
			);

			return console.log(
				'need to extract cartId from here',
				createUserCart,
				'this are the cart items being sent back',
				user.cart,
			);
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			} else {
				alert('An unexpected error occurred');
			}
		}
	};

	return (
		<div className="cartycart" onClick={handleClickOutside}>
			<div className="cartbody">
				<div>
					<button onClick={gloryToAFG}>ting</button>
				</div>
				{user?.cart && user.cart.length > 0 ? (
					user.cart.map((item) => (
						<div key={item.productId} className="cart-item">
							<CartItemComponent
								productId={item.productId}
								quantity={item.quantity}
							/>
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
