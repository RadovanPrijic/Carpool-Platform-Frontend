import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { getReviewsForUser } from "../../../services/review-service";
import ReviewComponent from "../components/ReviewComponent";

const GivenReviewsPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: givenReviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["given-reviews", params.id!, true],
    queryFn: () => getReviewsForUser(params.id!, true),
  });

  const handleNavigation = (id: number) => {
    navigate(`/reviews/edit/${id}`);
  };

  let content;
  if (isLoading) {
    content = <p>Loading ...</p>;
  } else if (error) {
    content = <p>Error!</p>;
  } else if (givenReviews) {
    content = (
      <>
        <ul>
          {givenReviews.map((review) => (
            <ReviewComponent
              review={review}
              onEdit={() => handleNavigation(review.id)}
            />
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <header>
        <h2>Given reviews</h2>
      </header>
      {content}
    </>
  );
};

export default GivenReviewsPage;
