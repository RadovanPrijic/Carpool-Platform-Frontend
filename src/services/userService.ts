import { API_ROUTES, ErrorResponse } from "../utils/apiConfig";
import { isErrorResponse, isUser } from "../utils/typeGuards";
import { User, UserUpdateDTO } from "../features/users/types";

export async function updateUser(
  id: string,
  userUpdateDTO: UserUpdateDTO
): Promise<User> {
  try {
    const response = await fetch(`${API_ROUTES.USERS}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userUpdateDTO),
    });

    console.log(response);
    const result: User | ErrorResponse = await response.json();
    console.log(result);

    if (isUser(result)) {
      console.log("Registration successful.");
      return result;
    }

    if (isErrorResponse(result)) {
      console.log(result.message);
      throw new Error(result.message);
    }

    throw new Error("Unexpected response format.");
  } catch (error) {
    console.log(error);
    throw new Error("An unexpected error has occured.");
  }
}
