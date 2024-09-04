import { Booking } from "../bookings/types";
import { User } from "../users/types";

export interface Ride {
  id: number;
  startLocation: string;
  endLocation: string;
  departureTime: Date;
  pricePerSeat: number;
  rideDescription?: string;
  carInfo: string;
  seatsAvailable: number;
  twoInBackseat: boolean;
  luggageSize: string;
  insuranceStatus: boolean;
  automaticBooking: boolean;
  createdAt: Date;
  user: User;
  bookings: Booking[];
}

export interface RideCreateDTO {
  startLocation: string;
  endLocation: string;
  departureTime: Date;
  pricePerSeat: number;
  rideDescription?: string;
  carInfo: string;
  seatsAvailable: number;
  twoInBackseat: boolean;
  luggageSize: string;
  insuranceStatus: boolean;
  automaticBooking: boolean;
  userId: string;
}

export interface RideUpdateDTO {
  startLocation: string;
  endLocation: string;
  departureTime: Date;
  pricePerSeat: number;
  rideDescription?: string;
  carInfo: string;
  seatsAvailable: number;
  twoInBackseat: boolean;
  luggageSize: string;
  insuranceStatus: boolean;
  automaticBooking: boolean;
}

export interface Location {
  id: number;
  city: string;
  country: string;
}
