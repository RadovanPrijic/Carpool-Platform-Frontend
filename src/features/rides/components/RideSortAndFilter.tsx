import React, { useState, useEffect } from "react";
import { Ride } from "../types";
import { useAppDispatch } from "../../../hooks/store-hooks";
import { ridesActions } from "../rides-slice";

interface SortingAndFilteringProps {
  rides: Ride[];
}

const timeRanges = [
  { label: "Midnight to 6 AM", start: "00:00", end: "06:00" },
  { label: "6:01 AM to 12 PM", start: "06:01", end: "12:00" },
  { label: "12:01 PM to 6 PM", start: "12:01", end: "18:00" },
  { label: "6:01 PM to Midnight", start: "18:01", end: "23:59" },
];

// Helper function to check if a time is within a given range
const isTimeInRange = (
  timeString: string,
  start: string,
  end: string
): boolean => {
  const [timeHours, timeMinutes] = timeString.split(":").map(Number);
  const [startHours, startMinutes] = start.split(":").map(Number);
  const [endHours, endMinutes] = end.split(":").map(Number);

  const time = timeHours * 60 + timeMinutes; // Convert to minutes
  const startTime = startHours * 60 + startMinutes;
  const endTime = endHours * 60 + endMinutes;

  return time >= startTime && time <= endTime;
};

const RideSortAndFilter: React.FC<SortingAndFilteringProps> = ({ rides }) => {
  const [sortOption, setSortOption] = useState<string>("departureTime");
  const [departureTimeFilter, setDepartureTimeFilter] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  // Apply filters and sorting
  useEffect(() => {
    applyFiltersAndSort();
  }, [sortOption, departureTimeFilter]);

  const applyFiltersAndSort = () => {
    let filteredRides = rides;

    if (departureTimeFilter.length > 0) {
      filteredRides = filteredRides.filter((ride) => {
        const rideTime = new Date(ride.departureTime)
          .toISOString()
          .split("T")[1]
          .slice(0, 5); // Get time part in HH:MM
        return departureTimeFilter.some((filter) =>
          timeRanges.some(
            (range) =>
              range.label === filter &&
              isTimeInRange(rideTime, range.start, range.end)
          )
        );
      });
    }

    // Sort based on selected option
    const sortedRides = [...filteredRides].sort((a, b) => {
      if (sortOption === "pricePerSeat") {
        return a.pricePerSeat - b.pricePerSeat; // Sort by price
      } else if (sortOption === "departureTime") {
        return (
          new Date(a.departureTime).getTime() -
          new Date(b.departureTime).getTime()
        ); // Sort by departure time
      }
      return 0;
    });

    dispatch(ridesActions.setFilteredRides(sortedRides));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleDepartureTimeFilter = (label: string) => {
    const newFilter = departureTimeFilter.includes(label)
      ? departureTimeFilter.filter((t) => t !== label)
      : [...departureTimeFilter, label];
    setDepartureTimeFilter(newFilter);
  };

  return (
    <div>
      <div>
        <label>Sort by: </label>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="departureTime">Departure Time</option>
          <option value="pricePerSeat">Price (Lowest First)</option>
        </select>
      </div>
      <div>
        {timeRanges.map((range) => (
          <label key={range.label}>
            <input
              type="checkbox"
              value={range.label}
              onChange={() => handleDepartureTimeFilter(range.label)}
              checked={departureTimeFilter.includes(range.label)}
            />
            {range.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RideSortAndFilter;
