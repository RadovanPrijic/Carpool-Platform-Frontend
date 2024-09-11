/* eslint-disable @typescript-eslint/no-explicit-any */
import { Notification, Picture, User } from "../features/users/types";
import { LoginResponseDTO } from "../features/authentication/types";
import { ErrorResponse } from "./api-config";
import { Conversation, Message } from "../features/messages/types";
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
    (data.profileBio === null || typeof data.profileBio === "string") &&
    (data.rating === null || typeof data.rating === "number") &&
    (data.chattinessPrefs === null ||
      typeof data.chattinessPrefs === "string") &&
    (data.musicPrefs === null || typeof data.musicPrefs === "string") &&
    (data.smokingPrefs === null || typeof data.smokingPrefs === "string") &&
    (data.petsPrefs === null || typeof data.petsPrefs === "string") &&
    new Date(data.departureTime) instanceof Date &&
    (data.picture === null || isPicture(data.picture)) &&
    (data.notifications === null ||
      (Array.isArray(data.notifications) &&
        data.notifications.every(isNotification)))
  );
}

export function isUserList(data: any): data is User[] {
  return Array.isArray(data) && data.every(isUser);
}

export function isRide(data: any): data is Ride {
  return (
    typeof data.id === "number" &&
    typeof data.startLocation === "string" &&
    typeof data.endLocation === "string" &&
    new Date(data.departureTime) instanceof Date &&
    typeof data.pricePerSeat === "number" &&
    (data.rideDescription === null ||
      typeof data.rideDescription === "string") &&
    typeof data.carInfo === "string" &&
    typeof data.seatsAvailable === "number" &&
    typeof data.twoInBackseat === "boolean" &&
    typeof data.luggageSize === "string" &&
    typeof data.insuranceStatus === "boolean" &&
    typeof data.automaticBooking === "boolean" &&
    new Date(data.createdAt) instanceof Date &&
    isUser(data.user)
  );
}

export function isRideList(data: any): data is Ride[] {
  return Array.isArray(data) && data.every(isRide);
}

export function isBooking(data: any): data is Booking {
  return (
    typeof data.id === "number" &&
    typeof data.bookingStatus === "string" &&
    typeof data.seatsBooked === "number" &&
    typeof data.totalPrice === "number" &&
    new Date(data.createdAt) instanceof Date &&
    (data.updatedAt === null || new Date(data.updatedAt) instanceof Date) &&
    isUser(data.user) &&
    isRide(data.ride) &&
    (data.review === null || isReview(data.review))
  );
}

export function isBookingList(data: any): data is Booking[] {
  return Array.isArray(data) && data.every(isBooking);
}

export function isReview(data: any): data is Review {
  return (
    typeof data.id === "number" &&
    typeof data.rating === "number" &&
    typeof data.comment === "string" &&
    new Date(data.createdAt) instanceof Date &&
    (data.updatedAt === null || new Date(data.updatedAt) instanceof Date) &&
    isUser(data.reviewer) &&
    typeof data.revieweeId === "string" &&
    isRide(data.ride)
  );
}

export function isReviewList(data: any): data is Review[] {
  return Array.isArray(data) && data.every(isReview);
}

export function isMessage(data: any): data is Message {
  return (
    typeof data.id === "number" &&
    typeof data.content === "string" &&
    typeof data.readStatus === "boolean" &&
    new Date(data.createdAt) instanceof Date &&
    isUser(data.sender) &&
    isUser(data.receiver)
  );
}

export function isMessageList(data: any): data is Message[] {
  return Array.isArray(data) && data.every(isMessage);
}

export function isConversation(data: any): data is Conversation {
  return (
    isUser(data.user) &&
    isMessage(data.lastMessage) &&
    typeof data.unreadMessagesCount === "number"
  );
}

export function isConversationList(data: any): data is Conversation[] {
  return Array.isArray(data) && data.every(isConversation);
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

export function isNotificationList(data: any): data is Notification[] {
  return Array.isArray(data) && data.every(isNotification);
}

export function isLocation(data: any): data is Location {
  return (
    typeof data.id === "number" &&
    typeof data.city === "string" &&
    typeof data.country === "string"
  );
}

export function isLocationList(data: any): data is Location[] {
  return Array.isArray(data) && data.every(isLocation);
}
