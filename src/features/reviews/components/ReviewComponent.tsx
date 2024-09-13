import Button from "../../../components/Button";
import { Review } from "../types";

interface ReviewComponentProps {
  review: Review;
  onEdit?: () => void;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({
  review,
  onEdit,
}) => {
  return (
    <li key={review.id}>
      {review.id} | {review.comment} | {review.rating} | {review.createdAt}
      {onEdit && <Button label="Edit review" onClick={onEdit} />}
    </li>
  );
};

export default ReviewComponent;
