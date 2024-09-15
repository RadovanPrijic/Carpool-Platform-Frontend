import { useRef, useState } from "react";
import { Booking } from "../types";
import Modal, { ModalHandle } from "../../../components/Modal";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../../../services/message-service";
import { queryClient } from "../../../utils/api-config";
import { useAppSelector } from "../../../hooks/store-hooks";
import {
  cancelBooking,
  updateBooking,
} from "../../../services/booking-service";
import Button from "../../../components/Button";
import Textarea from "../../../components/TextArea";

interface BookingComponentProps {
  booking: Booking;
  filter: string;
}

const BookingComponent: React.FC<BookingComponentProps> = ({
  booking,
  filter,
}) => {
  const userId = useAppSelector((state) => state.auth.userId);
  const [messageContent, setMessageContent] = useState<string>("");
  const modalRef = useRef<ModalHandle>(null);
  const navigate = useNavigate();

  const { mutate: trySendMessage } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (sentMessage) => {
      queryClient.invalidateQueries({
        queryKey: ["inbox", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["conversation-messages", userId, sentMessage.receiver.id],
      });
    },
  });

  const { mutate: tryUpdateBooking } = useMutation({
    mutationFn: updateBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings", userId, filter],
      });
    },
  });

  const { mutate: tryCancelBooking } = useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings", userId, filter],
      });
    },
  });

  const openModal = () => {
    modalRef.current!.open();
  };

  const closeModal = () => {
    modalRef.current!.close();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageContent(event.target.value);
  };

  const handleConfirm = (senderId: string, receiverId: string) => {
    trySendMessage({ content: messageContent, senderId, receiverId });
    closeModal();
  };

  const handleNavigation = (id: number) => {
    navigate(`/rides/review/${id}`);
  };

  return (
    <li key={booking.id}>
      {booking.id}: {booking.bookingStatus} {booking.ride.id}
      {filter === "for-user-requested" && (
        <>
          <Button
            label="Accept"
            onClick={() =>
              tryUpdateBooking({
                id: booking.id,
                bookingUpdateDTO: { bookingStatus: "accepted" },
              })
            }
          />
          <Button
            label="Reject"
            onClick={() =>
              tryUpdateBooking({
                id: booking.id,
                bookingUpdateDTO: { bookingStatus: "rejected" },
              })
            }
          />
        </>
      )}
      {filter === "for-user-accepted" && (
        <Button
          label="Cancel"
          onClick={() =>
            tryUpdateBooking({
              id: booking.id,
              bookingUpdateDTO: { bookingStatus: "cancelled" },
            })
          }
        />
      )}
      {((filter === "by-user-accepted" &&
        new Date(booking.ride.departureTime) > new Date()) ||
        filter === "by-user-requested") && (
        <Button label="Cancel" onClick={() => tryCancelBooking(booking.id)} />
      )}
      {filter === "by-user-accepted" &&
        new Date(booking.ride.departureTime) < new Date() &&
        booking.review === null && (
          <Button label="Review" onClick={() => handleNavigation(booking.id)} />
        )}
      <b onClick={openModal}> | Message</b>
      <div>
        <Modal
          title={`Message ${
            filter.includes("by-user")
              ? booking.ride.user.firstName + " " + booking.ride.user.lastName
              : booking.user.firstName + " " + booking.user.lastName
          }`}
          ref={modalRef}
          onCancel={closeModal}
          onConfirm={() =>
            handleConfirm(
              userId,
              filter.includes("by-user")
                ? booking.ride.user.id
                : booking.user.id
            )
          }
        >
          <Textarea
            label="Your message"
            id="message"
            name="message"
            value={messageContent}
            onChange={handleInputChange}
            placeholder="Enter your message ..."
            required
          />
        </Modal>
      </div>
    </li>
  );
};

export default BookingComponent;
