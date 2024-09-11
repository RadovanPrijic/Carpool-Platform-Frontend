import { ErrorResponse } from "react-router";
import {
  Booking,
  BookingCreateDTO,
  BookingUpdateDTO,
} from "../features/bookings/types";
import { API_ROUTES } from "../utils/api-config";
import { getAuthToken } from "../utils/auth";
import {
  isBooking,
  isBookingList,
  isErrorResponse,
} from "../utils/type-guards";

export async function getFilteredBookings(
  id: string,
  filter: string
): Promise<Booking[]> {
  try {
    const response = await fetch(
      `${API_ROUTES.BOOKINGS}/filtered/${id}?filter=${filter}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result: Booking[] | ErrorResponse = await response.json();
    console.log(result);

    if (isBookingList(result)) {
      console.log("Filtered bookings fetched successfully.");
      return result;
    }

    if (isErrorResponse(result)) {
      throw new Error(result.message);
    }

    throw new Error("Unexpected response format.");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("An unexpected error has occured.");
  }
}

export async function getAllBookingsForRide(id: number): Promise<Booking[]> {
  try {
    const response = await fetch(`${API_ROUTES.BOOKINGS}/for-ride/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
    });

    const result: Booking[] | ErrorResponse = await response.json();
    console.log(result);

    if (isBookingList(result)) {
      console.log("Bookings fetched successfully.");
      return result;
    }

    if (isErrorResponse(result)) {
      throw new Error(result.message);
    }

    throw new Error("Unexpected response format.");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("An unexpected error has occured.");
  }
}

export async function getBookingById(id: number): Promise<Booking> {
  try {
    const response = await fetch(`${API_ROUTES.BOOKINGS}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
    });

    const result: Booking | ErrorResponse = await response.json();
    console.log(result);

    if (isBooking(result)) {
      console.log("Booking fetched successfully.");
      return result;
    }

    if (isErrorResponse(result)) {
      throw new Error(result.message);
    }

    throw new Error("Unexpected response format.");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("An unexpected error has occured.");
  }
}

export async function createBooking(
  bookingCreateDTO: BookingCreateDTO
): Promise<Booking> {
  try {
    const response = await fetch(`${API_ROUTES.BOOKINGS}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingCreateDTO),
    });

    const result: Booking | ErrorResponse = await response.json();

    if (isBooking(result)) {
      console.log("Your booking has been successfully created.");
      return result;
    }

    if (isErrorResponse(result)) {
      throw new Error(result.message);
    }

    throw new Error("Unexpected response format.");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("An unexpected error has occured.");
  }
}

interface UpdateBookingArgs {
  id: number;
  bookingUpdateDTO: BookingUpdateDTO;
}

export async function updateBooking({
  id,
  bookingUpdateDTO,
}: UpdateBookingArgs): Promise<Booking> {
  try {
    const response = await fetch(`${API_ROUTES.BOOKINGS}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingUpdateDTO),
    });

    const result: Booking | ErrorResponse = await response.json();
    console.log(result);

    if (isBooking(result)) {
      console.log("Your booking has been successfully updated.");
      return result;
    }

    if (isErrorResponse(result)) {
      throw new Error(result.message);
    }

    throw new Error("Unexpected response format.");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("An unexpected error has occured.");
  }
}

export async function cancelBooking(id: number): Promise<Booking> {
  try {
    const response = await fetch(`${API_ROUTES.BOOKINGS}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
    });

    const result: Booking | ErrorResponse = await response.json();
    console.log(result);

    if (isBooking(result)) {
      console.log("The booking has been cancelled.");
      return result;
    }

    if (isErrorResponse(result)) {
      throw new Error(result.message);
    }

    throw new Error("Unexpected response format.");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("An unexpected error has occured.");
  }
}
