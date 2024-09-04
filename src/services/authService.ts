import { jwtDecode } from "jwt-decode";
import { MyJwtPayload } from "../utils/auth";
import {
  LoginRequestDTO,
  LoginResponseDTO,
  RegistrationRequestDTO,
} from "../features/authentication/types";
import { API_ROUTES, ErrorResponse } from "../utils/apiConfig";
import { isLoginResponse, isErrorResponse, isUser } from "../utils/typeGuards";
import { User } from "../features/users/types";

export async function login(
  loginRequestDTO: LoginRequestDTO
): Promise<LoginResponseDTO> {
  try {
    const response = await fetch(`${API_ROUTES.USERS}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequestDTO),
    });

    const result: LoginResponseDTO | ErrorResponse = await response.json();
    console.log(result);

    if (isLoginResponse(result)) {
      localStorage.setItem("token", result.token);
      const decoded = jwtDecode<MyJwtPayload>(result.token);
      localStorage.setItem("expiration", decoded.exp.toString());
      console.log("Login successful. Token and email confirmation saved.");
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

export async function register(
  registrationRequestDTO: RegistrationRequestDTO
): Promise<User> {
  try {
    const response = await fetch(`${API_ROUTES.USERS}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationRequestDTO),
    });

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
    throw new Error("An unexpected error has occured.");
  }
}
