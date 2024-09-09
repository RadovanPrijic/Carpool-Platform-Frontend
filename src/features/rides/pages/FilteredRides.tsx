import { useSearchParams } from "react-router-dom";
import { getFilteredRides } from "../../../services/ride-service";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import RideSortAndFilter from "../components/RideSortAndFilter";
import { useAppDispatch, useAppSelector } from "../../../hooks/store-hooks";
import { ridesActions } from "../rides-slice";
import { addHours } from "../../../utils/add-hours";

const FilteredRidesPage = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from")!;
  const to = searchParams.get("to")!;
  const date = searchParams.get("date")!;
  const seats = parseInt(searchParams.get("seats")!);
  const rides = useAppSelector((state) => state.rides.rides);
  const filteredRides = useAppSelector((state) => state.rides.filteredRides);
  const dispatch = useAppDispatch();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: getFilteredRides,
    onSuccess: async (filteredRidesList) => {
      const updatedRides = filteredRidesList.map((ride) => {
        const updatedDepartureTime = addHours(ride.departureTime, 4);
        const updatedCreatedAt = addHours(ride.createdAt, 4);
        return {
          ...ride,
          departureTime: updatedDepartureTime,
          createdAt: updatedCreatedAt,
        };
      });
      dispatch(ridesActions.setRides(updatedRides));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    mutate({ from, to, date, seats });
  }, [from, to, date, seats, mutate]);

  let content;

  if (isPending) {
    content = <p>Loading rides ...</p>;
  }

  if (isError) {
    content = <p>Error!</p>;
  }

  if (rides) {
    content = (
      <>
        <RideSortAndFilter rides={rides} />
        <ul className="events-list">
          {filteredRides!.map((ride) => (
            <li key={ride.id}>
              {ride.id} {ride.departureTime} {ride.pricePerSeat} RSD
            </li>
          ))}
        </ul>
      </>
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

export default FilteredRidesPage;
