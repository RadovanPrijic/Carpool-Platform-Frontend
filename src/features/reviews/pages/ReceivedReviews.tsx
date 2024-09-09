import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getReviewsForUser } from "../../../services/review-service";

const ReceivedReviewsPage = () => {
  const params = useParams();

  const {
    data: receivedReviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["received-reviews", params.id!],
    queryFn: () => getReviewsForUser(params.id!, false),
  });

  let content;

  if (isLoading) {
    content = <p>Loading rides ...</p>;
  }

  if (error) {
    content = <p>Error: {error.message}</p>;
  }

  if (receivedReviews) {
    content = (
      <>
        <ul>
          {receivedReviews.map((review) => (
            <li key={review.id}>
              {review.id} {review.comment} {review.rating} {review.ride.user.id}
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <section>
      <header>
        <h2>Received reviews</h2>
      </header>
      {content}
    </section>
  );
};

export default ReceivedReviewsPage;
