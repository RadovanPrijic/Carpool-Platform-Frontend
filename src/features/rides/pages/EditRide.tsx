import { useState } from "react";
import { Location, RideUpdateDTO } from "../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getLocations,
  getRideById,
  updateRide,
} from "../../../services/ride-service";
import { useParams } from "react-router";
import LocationDropdown from "../components/LocationDropdown";
import { queryClient } from "../../../utils/api-config";
import { useAppSelector } from "../../../hooks/store-hooks";

const EditRidePage = () => {
  const params = useParams();
  const userId = useAppSelector((state) => state.auth.userId);

  const { data: ride } = useQuery({
    queryKey: ["ride", params.id],
    queryFn: () => getRideById(parseInt(params.id!)),
    staleTime: Infinity,
  });

  const [startLocation, setStartLocation] = useState<Location | null>(null);
  const [endLocation, setEndLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState<RideUpdateDTO>({
    startLocation: ride?.startLocation ?? "",
    endLocation: ride?.endLocation ?? "",
    departureTime: ride?.departureTime ?? "",
    pricePerSeat: ride?.pricePerSeat ?? 0,
    rideDescription: ride?.rideDescription ?? "",
    carInfo: ride?.carInfo ?? "",
    seatsAvailable: ride?.seatsAvailable ?? 3,
    twoInBackseat: ride?.automaticBooking ?? true,
    luggageSize: ride?.luggageSize ?? "",
    insuranceStatus: ride?.insuranceStatus ?? false,
    automaticBooking: ride?.automaticBooking ?? false,
  });

  const { data: locations } = useQuery({
    queryKey: ["locations"],
    queryFn: () => getLocations(),
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    mutationFn: updateRide,
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: ["userRides", userId] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const inputValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prevFormData: RideUpdateDTO) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData((prevFormData: RideUpdateDTO) => ({
      ...prevFormData,
      startLocation: `${startLocation!.city}, ${startLocation!.country}`,
      endLocation: `${endLocation!.city}, ${endLocation!.country}`,
    })); // FIX (it doesn't get filled with these values the first time you send the request)
    mutate({ id: parseInt(params.id!), rideUpdateDTO: formData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <LocationDropdown
        label="Starting Location"
        setSelectedLocation={setStartLocation}
        locations={locations!}
        defaultValue={formData.startLocation}
      />
      <LocationDropdown
        label="End Location"
        setSelectedLocation={setEndLocation}
        locations={locations!}
        defaultValue={formData.endLocation}
      />

      <div>
        <label htmlFor="departureTime">Departure Time</label>
        <input
          type="datetime-local"
          id="departureTime"
          name="departureTime"
          value={formData.departureTime}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="pricePerSeat">Price Per Seat</label>
        <input
          type="number"
          id="pricePerSeat"
          name="pricePerSeat"
          value={formData.pricePerSeat}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="rideDescription">Ride Description (Optional)</label>
        <textarea
          id="rideDescription"
          name="rideDescription"
          value={formData.rideDescription}
          onChange={handleInputChange}
          maxLength={500}
        />
      </div>

      <div>
        <label htmlFor="carInfo">Car Info</label>
        <textarea
          id="carInfo"
          name="carInfo"
          value={formData.carInfo}
          onChange={handleInputChange}
          maxLength={250}
          required
        />
      </div>

      <div>
        <label htmlFor="seatsAvailable">Seats Available</label>
        <input
          type="number"
          id="seatsAvailable"
          name="seatsAvailable"
          value={formData.seatsAvailable}
          min="1"
          max="4"
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="twoInBackseat">Two in Backseat?</label>
        <input
          type="checkbox"
          id="twoInBackseat"
          name="twoInBackseat"
          checked={formData.twoInBackseat}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="luggageSize">Luggage Size</label>
        <input
          type="text"
          id="luggageSize"
          name="luggageSize"
          value={formData.luggageSize}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="insuranceStatus">Insurance Status</label>
        <input
          type="checkbox"
          id="insuranceStatus"
          name="insuranceStatus"
          checked={formData.insuranceStatus}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="automaticBooking">Automatic Booking</label>
        <input
          type="checkbox"
          id="automaticBooking"
          name="automaticBooking"
          checked={formData.automaticBooking}
          onChange={handleInputChange}
          required
        />
      </div>

      <button type="submit">Edit Ride</button>
    </form>
  );
};

export default EditRidePage;
