import './Card.css';
import ImgDisplay from '../ImgDisplay/ImgDisplay';
import Button from '../Button/Button';
import { Cards, CartItem } from '../../utils/tyBucket';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContextProvider';

export default function Card({ id, image, name, description, price }: Cards) {
	const navigate = useNavigate();
	const { user, setUser } = useUserContext();

	// taking user to the product detail page
	const handleProductRouting = () => {
		navigate(`/product/${id}`);
	};

	// adding products to userCart
	const handleAddToCart = (pid: string) => {
		if (user) {
			const doesItemExist = user.cart.find(
				(el: CartItem) => el.productId === pid,
			);
			let updatedCart;
			if (doesItemExist) {
				updatedCart = user.cart.map((item) =>
					item.productId === pid
						? { ...item, quantity: item.quantity + 1 }
						: item,
				);
			} else {
				updatedCart = [...user.cart, { productId: pid, quantity: 1 }];
			}
			setUser({
				...user,
				cart: updatedCart,
			});
		}
		console.log(user.cart);
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
