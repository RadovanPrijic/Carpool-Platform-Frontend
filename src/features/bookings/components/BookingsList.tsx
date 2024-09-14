import { Booking } from "../types";
import BookingComponent from "./Booking";

interface BookingsListProps {
  bookings: Booking[];
  filter: string;
}

const BookingsList: React.FC<BookingsListProps> = ({ bookings, filter }) => {
  return (
    <>
      {bookings && (
        <ul>
          {bookings.map((booking: Booking) => (
            <BookingComponent booking={booking} filter={filter} />
          ))}
        </ul>
      )}
    </>
  );
};

export default BookingsList;
