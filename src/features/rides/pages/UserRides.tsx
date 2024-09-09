import { useQuery } from "@tanstack/react-query";
import { getAllRidesForUser } from "../../../services/ride-service";
import { useAppSelector } from "../../../hooks/store-hooks";
import { Link } from "react-router-dom";
import { addHours } from "../../../utils/add-hours";

const UserRidesPage = () => {
  const userId = useAppSelector((state) => state.auth.userId);

  const {
    data: rides,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userRides", userId],
    queryFn: () => getAllRidesForUser(userId),
  });

  let content;

  if (isLoading) {
    content = <p>Loading rides ...</p>;
  }

  if (error) {
    content = <p>Error!</p>;
  }

  if (rides) {
    content = (
      <>
        <ul>
          {rides.map((ride) => (
            <li key={ride.id}>
              <Link to={`${ride.id}`}>
                {ride.id} {addHours(ride.departureTime, 4)} {ride.pricePerSeat}{" "}
                RSD
              </Link>
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

export default UserRidesPage;
