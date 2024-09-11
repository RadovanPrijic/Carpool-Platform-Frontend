import { useMutation, useQuery } from "@tanstack/react-query";
import { ReviewCreateDTO } from "../types";
import { useAppSelector } from "../../../hooks/store-hooks";
import { createReview } from "../../../services/review-service";
import { useState } from "react";
import { useParams } from "react-router";
import { getRideById } from "../../../services/ride-service";
import { getAllBookingsForRide } from "../../../services/booking-service";

const NewReviewPage = () => {
  const params = useParams();
  const userId = useAppSelector((state) => state.auth.userId);

  const { data: ride } = useQuery({
    queryKey: ["ride", params.id],
    queryFn: () => getRideById(parseInt(params.id!)),
  });

  const { data: bookings } = useQuery({
    queryKey: ["ride-bookings", params.id],
    queryFn: () => getAllBookingsForRide(parseInt(params.id!)),
  });

  const [formData, setFormData] = useState<ReviewCreateDTO>({
    rating: 1,
    comment: "",
    reviewerId: userId,
    revieweeId: ride?.user.id ?? "",
    rideId: ride?.id ?? 0,
    bookingId: bookings?.find((booking) => booking.user.id === userId)?.id ?? 0,
  });

  const { mutate } = useMutation({
    mutationFn: createReview,
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData: ReviewCreateDTO) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
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
      <button type="submit">Create Review</button>
    </form>
  );
};

export default NewReviewPage;
