import { useLoaderData, useNavigate, useParams } from "react-router";
import { deleteRide } from "../../../services/ride-service";
import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from "../../../hooks/store-hooks";
import { queryClient } from "../../../utils/api-config";
import { createBooking } from "../../../services/booking-service";
import { useRef, useState } from "react";
import Modal, { ModalHandle } from "../../../components/Modal";
import { Ride } from "../types";
import { Booking } from "../../bookings/types";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

const SingleRidePage = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const userId = useAppSelector((state) => state.auth.userId);
  const { ride, bookings } = useLoaderData() as {
    ride: Ride;
    bookings: Booking[];
  };
  const isRideCreator: boolean = userId === ride.user.id;
  const [numberOfSeats, setNumberOfSeats] = useState<number>(1);
  const modalRef = useRef<ModalHandle>(null);
  const params = useParams();
  const navigate = useNavigate();

  const { mutate: tryDeleteRide } = useMutation({
    mutationFn: deleteRide,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-rides", userId] });
      navigate("/rides");
    },
  });

  const { mutate: tryCreateBooking } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ride-bookings", params.id] });
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfSeats(parseInt(event.target.value));
  };

  const handleDeleteRide = () => {
    tryDeleteRide(parseInt(params.id!));
  };

  const handleNavigation = () => {
    navigate(`/rides/edit/${params.id}`);
  };

  const openModal = () => {
    modalRef.current!.open();
  };

  const closeModal = () => {
    modalRef.current!.close();
  };

  const handleConfirm = (
    totalPrice: number,
    userId: string,
    rideId: number
  ) => {
    tryCreateBooking({
      seatsBooked: numberOfSeats,
      totalPrice,
      userId,
      rideId,
    });
    closeModal();
  };

  return (
    <div>
      <header>
        <h2>Ride {ride.id}</h2>
      </header>
      {isRideCreator && (
        <>
          <Button label="Edit ride" onClick={() => handleNavigation()} />
          <Button label="Delete ride" onClick={handleDeleteRide} />
        </>
      )}
      {isAuthenticated &&
        !isRideCreator &&
        ride.seatsAvailable >
          bookings.filter((booking) => booking.bookingStatus == "accepted")
            .length && (
          <>
            <Button label="Book ride" onClick={openModal} />
            <div>
              <Modal
                title="Ride booking"
                ref={modalRef}
                onCancel={closeModal}
                onConfirm={() =>
                  handleConfirm(
                    ride.pricePerSeat * numberOfSeats,
                    userId,
                    ride.id
                  )
                }
              >
                <Input
                  label="Number of seats"
                  id="seats"
                  name="seats"
                  type="number"
                  value={numberOfSeats}
                  onChange={handleInputChange}
                  required
                />
              </Modal>
            </div>
          </>
        )}
    </div>
  );
};

export default SingleRidePage;
