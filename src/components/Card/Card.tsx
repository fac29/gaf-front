import './Card.css';
import ImgDisplay from '../ImgDisplay/ImgDisplay';
import Button from '../Button/Button';
import { Cards } from '../../utils/tyBucket';

export default function Card({ id, image, name, description, price }: Cards) {
	const handleProductRouting = () => {
		<a href={`/product/${id}`} />;
	};
	const handleAddToBasket = () => {};

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
