import { useNavigate, useParams } from "react-router";
import { deleteRide, getRideById } from "../../../services/ride-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../../hooks/store-hooks";
import { queryClient } from "../../../utils/api-config";

const SingleRidePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.auth.userId);
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

  let content;

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
