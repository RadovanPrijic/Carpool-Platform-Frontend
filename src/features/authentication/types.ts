export interface RegistrationRequestDTO {}

export interface RegistrationResponseDTO {}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;
  emailConfirmed: boolean;
}
