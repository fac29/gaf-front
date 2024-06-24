import './Card.css';
import ImgDisplay from '../ImgDisplay/ImgDisplay';
import Button from '../Button/Button';
import { Cards } from '../../utils/tyBucket';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContextProvider';
import { CartItem } from '../../utils/tyBucket';

export default function Card({ id, image, name, description, price }: Cards) {
	const navigate = useNavigate();
	//calling the customHook for the contextAPI function
	const { user, setUser } = useUserContext();

	// taking user to the product detail page
	const handleProductRouting = () => {
		navigate(`/product/${id}`);
	};
	//adding products to userCart
	const handleAddToCart = (productId: number) => {
		if (user) {
			const updatedCart: CartItem[] = [...user.cart];
			const existingCartItem: CartItem | undefined = updatedCart.find(
				(element) => element.productId === productId,
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

	return (
		<div className="card">
			<div onClick={handleProductRouting}>
				<ImgDisplay
					look={'thumbnail'}
					imgurl={image || '../Images/placeholder-image.jpg'}
				/>
				<div className="card-details">
					<div>
						<p className="cname">{name}</p>
						{description && <p>{description}</p>}
					</div>
					<p className="card-price">£{price.toFixed(2)}</p>
				</div>
			</div>
			<Button
				btnText="Add to basket"
				btnonClick={() => handleAddToCart(id)}
				btnclassName="btnPrimary"
			/>
		</div>
	);
}
