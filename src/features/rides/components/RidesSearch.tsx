import { useState } from "react";
import LocationsDropdown from "./LocationsDropdown";
import { useNavigate } from "react-router";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const RidesSearch = () => {
  const [startLocation, setStartLocation] = useState<string | null>(null);
  const [endLocation, setEndLocation] = useState<string | null>(null);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [seats, setSeats] = useState<number>(1);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(
      `/rides/filtered?from=${startLocation}&to=${endLocation}&date=${date}&seats=${seats}`
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Location Search Form</h2>
      <LocationsDropdown
        label="Starting Location"
        setSelectedLocation={setStartLocation}
      />
      <LocationsDropdown
        label="End Location"
        setSelectedLocation={setEndLocation}
      />
      <Input
        label="Date"
        id="date"
        name="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <Input
        label="Number of seats"
        id="seats"
        name="seats"
        type="number"
        value={seats}
        min={1}
        max={4}
        onChange={(e) => setSeats(parseInt(e.target.value))}
        required
      />
      <Button label="Submit" type="submit" />
    </form>
  );
};

export default RidesSearch;
