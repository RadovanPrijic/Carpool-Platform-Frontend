import { useMutation, useQuery } from "@tanstack/react-query";
import { getReviewById, updateReview } from "../../../services/review-service";
import { useParams } from "react-router";
import { ReviewUpdateDTO } from "../types";
import { useState } from "react";
import { useAppSelector } from "../../../hooks/store-hooks";
import { queryClient } from "../../../utils/api-config";

const EditReviewPage = () => {
  const params = useParams();
  const userId = useAppSelector((state) => state.auth.userId);

  const { data: review } = useQuery({
    queryKey: ["review", params.id],
    queryFn: () => getReviewById(params.id!),
  });

  const [formData, setFormData] = useState<ReviewUpdateDTO>({
    rating: review?.rating ?? 1,
    comment: review?.comment ?? "",
  });

  const { mutate } = useMutation({
    mutationFn: updateReview,
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: ["given-reviews", userId] });
    },
    onError: (error) => {
      console.log(error.message);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ id: parseInt(params.id!), reviewUpdateDTO: formData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="rating">Price Per Seat</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={formData.rating}
          min={1}
          max={5}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleInputChange}
          maxLength={1000}
          required
        />
      </div>
      <button type="submit">Edit Review</button>
    </form>
  );
};

export default EditReviewPage;
