import { useNavigate, useParams } from "react-router";
import { deleteRide, getRideById } from "../../../services/ride-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../../hooks/store-hooks";
import { queryClient } from "../../../utils/api-config";
import {
  createBooking,
  getAllBookingsForRide,
} from "../../../services/booking-service";
import { useRef, useState } from "react";
import Modal, { ModalHandle } from "../../../components/Modal";

const SingleRidePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.auth.userId);
  const [numberOfSeats, setNumberOfSeats] = useState<number>(1);
  const modalRef = useRef<ModalHandle>(null);
  let isRideCreator: boolean = false;

  const {
    data: ride,
    isSuccess,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ride", params.id],
    queryFn: () => getRideById(parseInt(params.id!)),
  });

  const { data: bookings, error: erorito } = useQuery({
    queryKey: ["ride-bookings", params.id],
    queryFn: () => getAllBookingsForRide(parseInt(params.id!)),
  });

  const { mutate } = useMutation({
    mutationFn: deleteRide,
    onSuccess: async (response) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: ["userRides", userId] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const { mutate: bookRide } = useMutation({
    mutationFn: createBooking,
    onSuccess: async (response) => {
      console.log(response);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  if (isSuccess && userId == ride.user.id) {
    isRideCreator = true;
  }

  const handleNavigation = (action: string) => {
    if (action === "edit") {
      navigate(`/rides/edit/${params.id}`);
    } else if (action === "review") {
      navigate(`/rides/review/${params.id}`);
    }
  };

  const handleRideDeletion = () => {
    mutate(parseInt(params.id!));
    navigate("/rides");
  };

  const openModal = () => {
    modalRef.current!.open();
  };

  const closeModal = () => {
    modalRef.current!.close();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfSeats(parseInt(event.target.value));
  };

  const handleConfirm = (
    totalPrice: number,
    userId: string,
    rideId: number
  ) => {
    bookRide({ seatsBooked: numberOfSeats, totalPrice, userId, rideId });
    modalRef.current!.close();
  };

  let content;

  if (erorito) {
    console.log(erorito.message);
  }
  if (isLoading) {
    content = <p>Loading rides ...</p>;
  }

  if (error) {
    content = <p>Error!</p>;
  }

  if (ride) {
    content = (
      <div>
        <div>
          {ride.id} {ride.pricePerSeat}
        </div>
        <br></br>
        {isRideCreator && (
          <div>
            <b onClick={() => handleNavigation("edit")}>Edit ride |</b>
            <b onClick={() => handleNavigation("review")}> Review ride |</b>
            <b onClick={handleRideDeletion}> Delete ride</b>
          </div>
        )}
        {ride.seatsAvailable >
        bookings!.filter((booking) => booking.bookingStatus == "accepted")
          .length ? (
          <>
            <b onClick={openModal}>Book</b>
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
                <label htmlFor="seats">Number of seats</label>
                <input
                  type="number"
                  id="seats"
                  name="seats"
                  value={numberOfSeats}
                  onChange={handleInputChange}
                  required
                />
              </Modal>
            </div>
          </>
        ) : null}
      </div>
    );
  }

  return (
    <section>
      <header>
        <h2>Rides</h2>
      </header>
      {content}
    </section>
  );
};

export default SingleRidePage;
