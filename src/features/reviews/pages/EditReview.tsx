import { useMutation } from "@tanstack/react-query";
import { getReviewById, updateReview } from "../../../services/review-service";
import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router";
import { Review, ReviewUpdateDTO } from "../types";
import { useState } from "react";
import { useAppSelector } from "../../../hooks/store-hooks";
import { queryClient } from "../../../utils/api-config";
import ReviewForm from "../components/ReviewForm";

const EditReviewPage = () => {
  const review = useLoaderData() as Review;
  const [formData, setFormData] = useState<ReviewUpdateDTO>({
    rating: review.rating,
    comment: review.comment,
  });
  const userId = useAppSelector((state) => state.auth.userId);
  const params = useParams();

  const { mutate: tryUpdateReview } = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["received-reviews", userId, false],
      });
      queryClient.invalidateQueries({
        queryKey: ["given-reviews", userId, true],
      });
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData: ReviewUpdateDTO) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdateReview = (e: React.FormEvent) => {
    e.preventDefault();
    tryUpdateReview({ id: parseInt(params.id!), reviewUpdateDTO: formData });
  };

  return (
    <ReviewForm
      comment={formData.comment}
      rating={formData.rating}
      type="update"
      onChange={handleInputChange}
      onSubmit={handleUpdateReview}
    />
  );
};

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    throw new Error("Review ID parameter is required.");
  }
  const reviewId = params.id;

  return queryClient.fetchQuery<Review>({
    queryKey: ["review", reviewId],
    queryFn: () => getReviewById(reviewId),
  });
}

export default EditReviewPage;
