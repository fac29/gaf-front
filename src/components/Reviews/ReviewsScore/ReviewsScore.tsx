import './ReviewsScore.css';
import { renderStars } from '../../../utils/utils';

type ReviewsScoreProps = {
    score: number;
  };

export default function ReviewsScore(score: ReviewsScoreProps) {
    console.log(score)

	return <div className="review-score">{renderStars(score.score)}</div>;
}
