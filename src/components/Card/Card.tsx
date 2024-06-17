import './Card.css';
import ImgDisplay from '../ImgDisplay/ImgDisplay';
import Button from '../Button/Button';
import { Cards } from '../../utils/tyBucket';

export default function Card({ image, name, description, price }: Cards) {
	const handleAddToBasket = () => {};

	return (
		<div className="card">
			<ImgDisplay
				look={'medium'}
				imgurl={image || '../Images/placeholder-image.jpg'}
			/>
			<div className="card-details">
				<div>
					<p className="cname">{name}</p>
					{description && <p>{description}</p>}
				</div>
				<p className="card-price">£{price.toFixed(2)}</p>
				<Button
					btnText="Add to basket"
					btnonClick={handleAddToBasket}
					btnclassName="btnPrimary"
				/>
			</div>
		</div>
	);
}
