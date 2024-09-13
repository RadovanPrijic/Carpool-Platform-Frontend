import { useMutation } from "@tanstack/react-query";
import { ReviewCreateDTO } from "../types";
import { useAppSelector } from "../../../hooks/store-hooks";
import { createReview } from "../../../services/review-service";
import { useState } from "react";
import { LoaderFunctionArgs, useLoaderData } from "react-router";
import { getRideById } from "../../../services/ride-service";
import { getAllBookingsForRide } from "../../../services/booking-service";
import ReviewForm from "../components/ReviewForm";
import { queryClient } from "../../../utils/api-config";
import { Ride } from "../../rides/types";
import { Booking } from "../../bookings/types";

const NewReviewPage = () => {
  const { ride, bookings } = useLoaderData() as {
    ride: Ride;
    bookings: Booking[];
  };
  const userId = useAppSelector((state) => state.auth.userId);

  const initialState: ReviewCreateDTO = {
    rating: 1,
    comment: "",
    reviewerId: userId,
    revieweeId: ride.user.id,
    rideId: ride.id,
    bookingId: bookings.find((booking) => booking.user.id === userId)?.id ?? 0,
  };
  const [formData, setFormData] = useState<ReviewCreateDTO>(initialState);

  const { mutate: tryCreateReview } = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      setFormData(initialState);
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
    setFormData((prevFormData: ReviewCreateDTO) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    tryCreateReview(formData);
  };

  return (
    <ReviewForm
      comment={formData.comment}
      rating={formData.rating}
      type="create"
      onChange={handleInputChange}
      onSubmit={handleCreateReview}
    />
  );
};

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    throw new Error("Ride ID parameter is required.");
  }
  const rideId = parseInt(params.id);

  const [ride, bookings] = await Promise.all([
    queryClient.fetchQuery<Ride>({
      queryKey: ["ride", rideId],
      queryFn: () => getRideById(rideId),
    }),
    queryClient.fetchQuery<Booking[]>({
      queryKey: ["ride-bookings", rideId],
      queryFn: () => getAllBookingsForRide(rideId),
    }),
  ]);

  return { ride, bookings };
}

export default NewReviewPage;
