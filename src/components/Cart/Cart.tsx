//import React from 'react'
import './Cart.css';
import { useUserContext } from '../UserContextProvider';
import Button from '../Button/Button';
import ImgDisplay from '../ImgDisplay/ImgDisplay';

export default function Cart() {
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
			console.log(`Added product ${productId} to cart`);
			console.log(user.cart);
		}
	};

	return <div className="cartycart">
		<h6>Shopping Cart</h6>
		<div>

		{user && user.cart.length > 0 ? 
			user.cart.map((item) => (
            <div key={item.productId}>
				<ImgDisplay
					look={'cartimage'}
					imgurl={item.image_path || '../Images/placeholder-image.jpg'}
				/>
				<p>{item.name}</p>
				<Button onClick={() => ()}> -
                </Button>
				<p>{item.quantity}</p>
				<Button onClick={() => handleAddToCart(item.productId)}>
                    +
                </Button>
				</div>))
		 : (
			<div>
				<p>your cart is empty</p>
			</div>
		)}
		

				</div>

	</div>;
}
