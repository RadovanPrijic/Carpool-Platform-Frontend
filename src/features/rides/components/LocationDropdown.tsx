import { useState } from "react";
import { Location } from "../types";
import { debounce } from "lodash";

interface LocationDropdownProps {
  label: string;
  setSelectedLocation: React.Dispatch<React.SetStateAction<Location | null>>;
  locations: Location[];
}

const LocationDropdown: React.FC<LocationDropdownProps> = ({
  label,
  setSelectedLocation,
  locations,
}) => {
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchTerm(input);
    filterLocations(input);
  };

  // Debounced filtering function
  const filterLocations = debounce((input: string) => {
    const filtered = locations.filter((location) =>
      `${location.city}, ${location.country}`
        .toLowerCase()
        .includes(input.toLowerCase())
    );
    setFilteredLocations(filtered);
  }, 300);

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    setSearchTerm(`${location.city}, ${location.country}`);
    setFilteredLocations([]);
  };

  return (
    <div className="location-dropdown">
      <label>{label}</label>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={`Search for ${label.toLowerCase()}...`}
        autoComplete="off"
      />

      {filteredLocations.length > 0 && (
        <ul className="dropdown-menu">
          {filteredLocations.map((location) => (
            <li key={location.id} onClick={() => handleLocationClick(location)}>
              {location.city}, {location.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationDropdown;
