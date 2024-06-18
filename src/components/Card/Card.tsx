import './Card.css';
import ImgDisplay from '../ImgDisplay/ImgDisplay';
import Button from '../Button/Button';
import { Cards } from '../../utils/tyBucket';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContextProvider';

export default function Card({ id, image, name, description, price }: Cards) {
	const navigate = useNavigate();
	const { user, setUser } = useUserContext();

	const handleProductRouting = () => {
		navigate(`/product/${id}`);
	};
	const handleAddToBasket = () => {
		if(user) setUser({ ...user, cart: [...user.cart[]] });
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

				<Button
					btnText="Add to basket"
					btnonClick={handleAddToBasket}
					btnclassName="btnPrimary"
				/>
			</div>
		</div>
	);
}
