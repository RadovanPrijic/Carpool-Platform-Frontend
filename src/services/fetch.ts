import { jwtDecode } from "jwt-decode";
import { MyJwtPayload } from "../utils/auth";
import {
  LoginRequestDTO,
  LoginResponseDTO,
} from "../features/authentication/types";
import { ErrorResponse, isError } from "../utils/ApiError";

function isLoginResponse(response: any): response is LoginResponseDTO {
  return (
    (response as LoginResponseDTO).token !== undefined &&
    (response as LoginResponseDTO).emailConfirmed !== undefined
  );
}

export async function login(email: string, password: string): Promise<void> {
  const loginData: LoginRequestDTO = { email, password };

  try {
    const response = await fetch("https://localhost:7153/api/Users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    // Parse the response as a ServiceResponse<LoginResponseDTO>
    const serviceResponse: LoginResponseDTO | ErrorResponse =
      await response.json();

    console.log(serviceResponse);

    if (isLoginResponse(serviceResponse)) {
      const { token, emailConfirmed } = serviceResponse;
      localStorage.setItem("token", token);

      try {
        const decoded = jwtDecode<MyJwtPayload>(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp > currentTime) {
          localStorage.setItem("expiration", decoded.exp.toString());
        }
      } catch (error) {
        console.error("The JWT token is invalid.", error);
      }

      // localStorage.setItem("emailConfirmed", String(emailConfirmed));
      console.log("Login successful. Token and email confirmation saved.");
      // Optionally redirect or perform other actions
    } else {
      if (isError(serviceResponse)) {
        console.log(serviceResponse.message);
      }
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
