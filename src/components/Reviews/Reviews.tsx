import './Reviews.css'
import { ReviewsProp } from '../../utils/tyBucket'



export default function Reviews({ reviewsArray }: ReviewsProp) {
    return (
      <div className="reviews-container">
        {reviewsArray.map((review) => (
          <div key={review.id} className="review-item">
            <img src={review.image} alt={review.name} className="review-image" />
            <div className="review-content">
              <h3>{review.name}</h3>
              <p>{review.description}</p>
              <p>Score: {review.score}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }