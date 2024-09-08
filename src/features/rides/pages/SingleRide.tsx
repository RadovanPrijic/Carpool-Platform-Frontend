import { useParams } from "react-router";
import { getRideById } from "../../../services/ride-service";
import { useQuery } from "@tanstack/react-query";

const SingleRidePage = () => {
  const params = useParams();

  const {
    data: ride,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ride", params.id],
    queryFn: () => getRideById(parseInt(params.id!)),
  });
  let content;

  if (isLoading) {
    content = <p>Loading rides ...</p>;
  }

  if (error) {
    content = <p>Error!</p>;
  }

  if (ride) {
    content = (
      <>
        <div>
          {ride.id} {ride.pricePerSeat}
        </div>
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

export default SingleRidePage;
