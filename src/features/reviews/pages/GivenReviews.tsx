import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { getReviewsForUser } from "../../../services/review-service";

const GivenReviewsPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: givenReviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["given-reviews", params.id!],
    queryFn: () => getReviewsForUser(params.id!, true),
  });

  const handleNavigation = (id: number) => {
    navigate(`/reviews/edit/${id}`);
  };

  let content;

  if (isLoading) {
    content = <p>Loading rides ...</p>;
  }

  if (error) {
    content = <p>Error! {error.message}</p>;
  }

  if (givenReviews) {
    content = (
      <>
        <ul>
          {givenReviews.map((review) => (
            <li key={review.id}>
              {review.id} {review.comment} {review.rating} {review.ride.user.id}
              <b onClick={() => handleNavigation(review.id)}>Edit review</b>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <section>
      <header>
        <h2>Given reviews</h2>
      </header>
      {content}
    </section>
  );
};

export default GivenReviewsPage;
