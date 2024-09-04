import { Picture, User } from "../features/users/types";
import { LoginResponseDTO } from "../features/authentication/types";
import { ErrorResponse } from "./apiConfig";
import { Message } from "../features/messages/types";
import { Location, Ride } from "../features/rides/types";
import { Review } from "../features/reviews/types";
import { Booking } from "../features/bookings/types";

export function isErrorResponse(response: any): response is ErrorResponse {
  return typeof response.message === "string";
}

export function isLoginResponse(data: any): data is LoginResponseDTO {
  return (
    typeof data.token === "string" && typeof data.emailConfirmed === "boolean"
  );
}

export function isUser(data: any): data is User {
  return (
    typeof data.id === "string" &&
    typeof data.firstName === "string" &&
    typeof data.lastName === "string" &&
    typeof data.email === "string" &&
    typeof data.phoneNumber === "string" &&
    new Date(data.birthDate) instanceof Date &&
    (data.profileBio === undefined || typeof data.profileBio === "string") &&
    (data.rating === undefined || typeof data.rating === "number") &&
    (data.chattinessPrefs === undefined ||
      typeof data.chattinessPrefs === "string") &&
    (data.musicPrefs === undefined || typeof data.musicPrefs === "string") &&
    (data.smokingPrefs === undefined ||
      typeof data.smokingPrefs === "string") &&
    (data.petsPrefs === undefined || typeof data.petsPrefs === "string") &&
    new Date(data.departureTime) instanceof Date &&
    (data.picture === undefined || isPicture(data.picture)) &&
    (data.notifications === undefined ||
      (Array.isArray(data.notifications) &&
        data.notifications.every(isNotification)))
  );
}

export function isRide(data: any): data is Ride {
  return (
    typeof data.id === "number" &&
    typeof data.startLocation === "string" &&
    typeof data.endLocation === "string" &&
    new Date(data.departureTime) instanceof Date &&
    typeof data.pricePerSeat === "number" &&
    (data.rideDescription === undefined ||
      typeof data.rideDescription === "string") &&
    typeof data.carInfo === "string" &&
    typeof data.seatsAvailable === "number" &&
    typeof data.twoInBackseat === "boolean" &&
    typeof data.luggageSize === "string" &&
    typeof data.insuranceStatus === "boolean" &&
    typeof data.automaticBooking === "boolean" &&
    new Date(data.createdAt) instanceof Date &&
    isUser(data.user) &&
    Array.isArray(data.bookings) &&
    data.bookings.every(isBooking)
  );
}

export function isBooking(data: any): data is Booking {
  return (
    typeof data.id === "number" &&
    typeof data.bookingStatus === "string" &&
    typeof data.seatsBooked === "number" &&
    typeof data.totalPrice === "number" &&
    new Date(data.createdAt) instanceof Date &&
    (data.updatedAt === undefined ||
      new Date(data.updatedAt) instanceof Date) &&
    isUser(data.user) &&
    typeof data.rideId === "number" &&
    (data.review === undefined || isReview(data.review))
  );
}

export function isReview(data: any): data is Review {
  return (
    typeof data.id === "number" &&
    typeof data.rating === "number" &&
    typeof data.comment === "string" &&
    new Date(data.createdAt) instanceof Date &&
    (data.updatedAt === undefined ||
      new Date(data.updatedAt) instanceof Date) &&
    isUser(data.reviewer) &&
    typeof data.revieweeId === "string" &&
    isRide(data.ride)
  );
}

export function isMessage(data: any): data is Message {
  return (
    typeof data.id === "number" &&
    typeof data.content === "string" &&
    typeof data.readStatus === "boolean" &&
    new Date(data.createdAt) instanceof Date &&
    typeof data.senderId === "string" &&
    typeof data.receiverId === "string"
  );
}

export function isPicture(data: any): data is Picture {
  return typeof data.id === "number" && typeof data.filePath === "string";
}

export function isNotification(data: any): data is Notification {
  return (
    typeof data.id === "number" &&
    typeof data.message === "string" &&
    typeof data.checkedStatus === "boolean" &&
    new Date(data.createdAt) instanceof Date
  );
}

export function isLocation(data: any): data is Location {
  return (
    typeof data.id === "number" &&
    typeof data.city === "string" &&
    typeof data.country === "string"
  );
}
