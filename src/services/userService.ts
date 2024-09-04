import { API_ROUTES, ErrorResponse } from "../utils/apiConfig";
import {
  isErrorResponse,
  isNotificationList,
  isPicture,
  isUser,
} from "../utils/typeGuards";
import { Picture, User, UserUpdateDTO } from "../features/users/types";
import { getAuthToken } from "../utils/auth";

export async function updateUser(
  id: string,
  userUpdateDTO: UserUpdateDTO
): Promise<User> {
  try {
    const response = await fetch(`${API_ROUTES.USERS}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getAuthToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userUpdateDTO),
    });

    const result: User | ErrorResponse = await response.json();
    console.log(result);

    if (isUser(result)) {
      console.log("User update successful.");
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

export async function getUserNotifications(
  id: string,
  markAsChecked: boolean
): Promise<Notification[]> {
  try {
    const response = await fetch(`${API_ROUTES.USERS}/notifications/${id}`, {
      method: `${markAsChecked ? "PUT" : "GET"}`,
      headers: {
        Authorization: `Bearer ${getAuthToken}`,
        "Content-Type": "application/json",
      },
    });

    const result: Notification[] | ErrorResponse = await response.json();
    console.log(result);

    if (isNotificationList(result)) {
      console.log("User notifications successfully fetched.");
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

export async function uploadProfilePicture(
  pictureData: FormData
): Promise<Picture> {
  try {
    const response = await fetch(`${API_ROUTES.USERS}/upload-profile-picture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAuthToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pictureData),
    });

    const result: Picture | ErrorResponse = await response.json();
    console.log(result);

    if (isPicture(result)) {
      console.log("Profile picture upload succesful.");
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

export async function deleteProfilePicture(id: number): Promise<string> {
  try {
    const response = await fetch(
      `${API_ROUTES.USERS}/remove-profile-picture/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAuthToken}`,
        },
      }
    );

    if (response.status === 204) {
      return "Your profile picture has been removed.";
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
