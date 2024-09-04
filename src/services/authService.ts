import { jwtDecode } from "jwt-decode";
import { getAuthToken, MyJwtPayload } from "../utils/auth";
import {
  EmailDTO,
  LoginRequestDTO,
  LoginResponseDTO,
  PasswordDTO,
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
      throw new Error(result.message);
    }

    throw new Error("Unexpected response format.");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("An unexpected error has occured.");
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
      throw new Error(result.message);
    }

    throw new Error("Unexpected response format.");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("An unexpected error has occured.");
  }
}

export async function initiateEmailConfirmation(id: string): Promise<string> {
  try {
    const response = await fetch(
      `${API_ROUTES.USERS}/initiate-email-confirmation/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken}`,
        },
      }
    );

    if (response.status === 204) {
      return "Check your email address for an email confirmation link.";
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

export async function initiateEmailChange(
  id: string,
  emailDTO: EmailDTO
): Promise<string> {
  try {
    const response = await fetch(
      `${API_ROUTES.USERS}/initiate-email-change/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailDTO),
      }
    );

    if (response.status === 204) {
      return "Check your email address for an email change link.";
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

export async function confirmEmail(
  id: string,
  confirmationToken: string,
  emailChange: boolean,
  newEmail?: string
): Promise<string> {
  try {
    const response = await fetch(
      `${
        API_ROUTES.USERS
      }/confirm-email?id=${id}&confirmationToken=${confirmationToken}&emailChange=${emailChange}${
        newEmail !== undefined ? `&newEmail=${newEmail}` : ""
      }`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken}`,
        },
      }
    );

    if (response.status === 204) {
      return `Your email has been ${emailChange ? "changed" : "confirmed"}.`;
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

export async function initiatePasswordReset(email: string): Promise<string> {
  try {
    const response = await fetch(
      `${API_ROUTES.USERS}/initiate-password-reset/${email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 204) {
      return "Check your email address for a password reset link.";
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

export async function resetPassword(
  email: string,
  resetToken: string,
  passwordDTO: PasswordDTO
): Promise<string> {
  try {
    const response = await fetch(
      `${API_ROUTES.USERS}/reset-password?email=${email}&resetToken=${resetToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordDTO),
      }
    );

    if (response.status === 204) {
      return `Your password has been reset.`;
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
