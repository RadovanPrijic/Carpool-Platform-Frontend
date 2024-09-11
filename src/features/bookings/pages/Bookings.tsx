import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useAppSelector } from "../../../hooks/store-hooks";
import {
  cancelBooking,
  getFilteredBookings,
  updateBooking,
} from "../../../services/booking-service";
import { Booking } from "../types";
import { addHours } from "../../../utils/add-hours";
import { sendMessage } from "../../../services/message-service";
import { queryClient } from "../../../utils/api-config";
import { useNavigate } from "react-router";
import Modal, { ModalHandle } from "../../../components/Modal";

const BookingsPage = () => {
  const userId = useAppSelector((state) => state.auth.userId);
  const deadlineDateTime = new Date(addHours(new Date().toISOString(), 1));
  const [filter, setFilter] = useState<string>("by-user-requested");
  const navigate = useNavigate();
  const [messageContent, setMessageContent] = useState<string>("");

  const modalRef = useRef<ModalHandle>(null);

  const openModal = () => {
    modalRef.current!.open();
  };

  const closeModal = () => {
    modalRef.current!.close();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageContent(event.target.value);
  };

  const handleConfirm = (senderId: string, receiverId: string) => {
    dispatchMessage({ content: messageContent, senderId, receiverId });
    modalRef.current!.close();
  };

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", userId, filter],
    queryFn: () => getFilteredBookings(userId, filter),
  });

  const { mutate: dispatchMessage } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (responseData) => {
      queryClient.invalidateQueries({
        queryKey: ["conversation-messages", userId, responseData.receiver.id],
      });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const { mutate: updateStatus } = useMutation({
    mutationFn: updateBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings", userId, filter],
      });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const { mutate: cancel } = useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings", userId, filter],
      });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleReviewClick = (id: number) => {
    navigate(`/rides/review/${id}`);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Bookings</h2>
      <div>
        <label>
          <input
            type="radio"
            value="by-user-requested"
            checked={filter === "by-user-requested"}
            onChange={handleFilterChange}
          />
          Your requested bookings
        </label>
        <label>
          <input
            type="radio"
            value="by-user-accepted"
            checked={filter === "by-user-accepted"}
            onChange={handleFilterChange}
          />
          Your accepted bookings
        </label>
        <label>
          <input
            type="radio"
            value="for-user-requested"
            checked={filter === "for-user-requested"}
            onChange={handleFilterChange}
          />
          Requested bookings for your rides
        </label>
        <label>
          <input
            type="radio"
            value="for-user-accepted"
            checked={filter === "for-user-accepted"}
            onChange={handleFilterChange}
          />
          Accepted bookings for your rides
        </label>
      </div>

      {isLoading && <p>Loading bookings...</p>}

      {error && <p>Error fetching bookings: {error.message}</p>}

      {bookings && (
        <ul>
          {bookings.map((booking: Booking) => (
            <li key={booking.id}>
              {booking.id}: {booking.bookingStatus} {booking.ride.id}
              {filter === "for-user-requested" && (
                <b
                  onClick={() =>
                    updateStatus({
                      id: booking.id,
                      bookingUpdateDTO: { bookingStatus: "rejected" },
                    })
                  }
                >
                  | Reject |{" "}
                </b>
              )}
              {filter === "for-user-requested" && (
                <b
                  onClick={() =>
                    updateStatus({
                      id: booking.id,
                      bookingUpdateDTO: { bookingStatus: "accepted" },
                    })
                  }
                >
                  Accept
                </b>
              )}
              {filter === "for-user-accepted" && (
                <b
                  onClick={() =>
                    updateStatus({
                      id: booking.id,
                      bookingUpdateDTO: { bookingStatus: "cancelled" },
                    })
                  }
                >
                  Cancel
                </b>
              )}
              {((filter === "by-user-accepted" &&
                new Date(addHours(booking.ride.departureTime, 4)) <
                  deadlineDateTime) ||
                filter === "by-user-requested") && (
                <b onClick={() => cancel(booking.id)}> | Cancel</b>
              )}
              {filter === "by-user-accepted" &&
                new Date(addHours(booking.ride.departureTime, 4)) <
                  deadlineDateTime &&
                booking.review === null && (
                  <b onClick={() => handleReviewClick(booking.id)}> | Review</b>
                )}
              <b onClick={openModal}> | Message</b>
              <div>
                {/* The Modal component */}
                <Modal
                  title="Message someone"
                  message="Type in your msg broski"
                  ref={modalRef}
                  onCancel={closeModal}
                  onConfirm={() =>
                    handleConfirm(
                      userId,
                      filter.includes("by-user")
                        ? booking.ride.user!.id
                        : booking.user.id
                    )
                  }
                >
                  <label htmlFor="message">Message</label>
                  <input
                    type="text"
                    id="message"
                    name="message"
                    value={messageContent}
                    onChange={handleInputChange}
                    required
                  />
                </Modal>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingsPage;
