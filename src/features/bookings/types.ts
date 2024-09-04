import { Review } from "../reviews/types";
import { User } from "../users/types";

export interface Booking {
  id: number;
  bookingStatus: string;
  seatsBooked: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt?: Date;
  user: User;
  rideId: number;
  review?: Review;
}

export interface BookingCreateDTO {
  seatsBooked: number;
  totalPrice: number;
  userId: string;
  rideId: number;
}

export interface BookingUpdateDTO {
  bookingStatus: string;
}
