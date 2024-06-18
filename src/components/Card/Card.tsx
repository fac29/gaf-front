import './Card.css';
import ImgDisplay from '../ImgDisplay/ImgDisplay';
import Button from '../Button/Button';
import { Cards, Cart } from '../../utils/tyBucket';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContextProvider';
import { CartItem } from '../../utils/tyBucket';

export default function Card({ id, image, name, description, price }: Cards) {
	const navigate = useNavigate();
	const { user, setUser } = useUserContext();

	const handleProductRouting = () => {
		navigate(`/product/${id}`);
	};
	const handleAddToCart = (id: string) => {
		if (user) {
			const doesItemExist = user.cart.find(
				(el: CartItem) => el.productId === id,
			);
			if (doesItemExist) {
				doesItemExist.quantity += 1;
			} else {
				let newCart = [...user.cart, { productId: id, quantity: 1 }];

				setUser({
					...user,
					cart: newCart,
				});
			}
		}
		console.log(user);
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
				btnonClick={handleAddToCart(id)}
				btnclassName="btnPrimary"
			/>
		</div>
	);
}
