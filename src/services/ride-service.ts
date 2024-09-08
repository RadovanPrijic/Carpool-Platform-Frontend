import { ErrorResponse } from "react-router";
import {
  Location,
  Ride,
  RideCreateDTO,
  RideUpdateDTO,
} from "../features/rides/types";
import { API_ROUTES, CreatedAtResponse } from "../utils/api-config";
import { getAuthToken } from "../utils/auth";
import {
  isCreatedAtResponse,
  isErrorResponse,
  isLocationList,
  isRide,
  isRideList,
} from "../utils/type-guards";

interface GetFilteredRidesArgs {
  from: string;
  to: string;
  date: string;
  seats: number;
}

export async function getFilteredRides({
  from,
  to,
  date,
  seats,
}: GetFilteredRidesArgs): Promise<Ride[]> {
  try {
    const response = await fetch(
      `${API_ROUTES.RIDES}/?from=${encodeURIComponent(
        from
      )}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(
        date
      )}&seats=${seats}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result: Ride[] | ErrorResponse = await response.json();
    console.log(result);

    if (isRideList(result)) {
      console.log("Rides fetched successfully.");
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

export async function getAllRidesForUser(id: string): Promise<Ride[]> {
  try {
    const response = await fetch(`${API_ROUTES.RIDES}/all/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
    });

    const result: Ride[] | ErrorResponse = await response.json();
    console.log(result);

    if (isRideList(result)) {
      console.log("Rides fetched successfully.");
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

export async function getRideById(id: number): Promise<Ride> {
  try {
    const response = await fetch(`${API_ROUTES.RIDES}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
    });

    const result: Ride | ErrorResponse = await response.json();
    console.log(result);

    if (isRide(result)) {
      console.log("Ride fetched successfully.");
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

export async function createRide(rideCreateDTO: RideCreateDTO): Promise<Ride> {
  try {
    const response = await fetch(`${API_ROUTES.RIDES}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rideCreateDTO),
    });

    const result: CreatedAtResponse<Ride> | ErrorResponse =
      await response.json();

    if (isCreatedAtResponse<Ride>(result, isRide)) {
      console.log("Your ride has been successfully created.");
      console.log(result.createdResource);
      return result.createdResource;
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

interface UpdateRideArgs {
  id: number;
  rideUpdateDTO: RideUpdateDTO;
}

export async function updateRide({
  id,
  rideUpdateDTO,
}: UpdateRideArgs): Promise<Ride> {
  try {
    const response = await fetch(`${API_ROUTES.RIDES}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rideUpdateDTO),
    });

    const result: Ride | ErrorResponse = await response.json();
    console.log(result);

    if (isRide(result)) {
      console.log("Your ride has been successfully updated.");
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

export async function deleteRide(id: number): Promise<string> {
  try {
    const response = await fetch(`${API_ROUTES.RIDES}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (response.status === 204) {
      return "Your ride has been successfully deleted.";
    }

    const result: ErrorResponse = await response.json();

    if (isErrorResponse(result)) {
      throw new Error(result.message);
    }

    throw new Error("Unexpected response format.");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("An unexpected error has occured.");
  }
}

export async function getLocations(): Promise<Location[]> {
  try {
    const response = await fetch(`${API_ROUTES.RIDES}/locations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result: Location[] | ErrorResponse = await response.json();
    // console.log(result);

    if (isLocationList(result)) {
      // console.log("Locations fetched successfully.");
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
