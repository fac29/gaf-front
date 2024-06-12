import './Card.css';
import ImgDisplay from '../ImgDisplay/ImgDisplay';
import Button from '../Button/Button';

type CardProps = {
	image?: string;
	name: string;
	description?: string;
	price: number;
};

/**
 * Card Component
 *
 * @param {string} [image] - The URL or path of the product image. Optional.
 * @param {string} name - The name of the product.
 * @param {string} [description] - A brief description of the product. Optional.
 * @param {number} price - The price of the product.
 * @returns {JSX.Element} The Card component displaying product details.
 */
export default function Card({
	image,
	name,
	description,
	price,
}: CardProps): JSX.Element {
	return (
		<div className="card">
			<ImgDisplay
				size={'medium'}
				image={image || '../Images/placeholder-image.jpg'}
			/>
			<div className="card-details">
				<h2>{name}</h2>
				{description && <p>{description}</p>}
				<p className="card-price">£{price.toFixed(2)}</p>
				<Button
					btnText="Add to basket"
					btnonClick={()=>{})}
					btnclassName="add-to-basket-btn"
				/>
			</div>
		</div>
	);
}
