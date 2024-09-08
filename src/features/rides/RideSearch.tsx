import { useState } from "react";
import { getLocations } from "../../services/ride-service";
import { useQuery } from "@tanstack/react-query";
import LocationDropdown from "./LocationDropdown";
import { Location } from "./types";
import { useNavigate } from "react-router";

const RideSearch = () => {
  const [startLocation, setStartLocation] = useState<Location | null>(null);
  const [endLocation, setEndLocation] = useState<Location | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [seats, setSeats] = useState<number>(1);
  const navigate = useNavigate();

  const {
    data: locations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["locations"],
    queryFn: () => getLocations(),
    staleTime: Infinity,
  });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(
      `/filtered-rides?from=${
        startLocation!.city + ", " + startLocation!.country
      }&to=${
        endLocation!.city + ", " + endLocation!.country
      }&date=${date.toISOString()}&seats=${seats}`
    );
  };

  if (isLoading) {
    return <div>Loading locations...</div>;
  }

  if (error) {
    return <div>Error loading locations: {error.message}</div>;
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Location Search Form</h2>
      <LocationDropdown
        label="Starting Location"
        setSelectedLocation={setStartLocation}
        locations={locations!}
      />
      <LocationDropdown
        label="End Location"
        setSelectedLocation={setEndLocation}
        locations={locations!}
      />
      <div className="form-control">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date.toISOString().split("T")[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
      </div>
      <div className="form-control">
        <label htmlFor="seats">Number of seats</label>
        <input
          id="seats"
          type="number"
          name="seats"
          value={seats}
          min="1"
          max="4"
          onChange={(e) => setSeats(parseInt(e.target.value))}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RideSearch;
