export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthDate: Date;
  profileBio?: string;
  rating?: number;
  chattinessPrefs?: string;
  musicPrefs?: string;
  smokingPrefs?: string;
  petsPrefs?: string;
  createdAt: Date;
  picture?: Picture;
  notifications?: Notification[];
}

export interface UserUpdateDTO {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: Date;
  profileBio?: string;
  chattinessPrefs?: string;
  musicPrefs?: string;
  smokingPrefs?: string;
  petsPrefs?: string;
}

export interface Notification {
  id: number;
  message: string;
  checkedStatus: boolean;
  createdAt: Date;
}

export interface Picture {
  id: number;
  filePath: string;
}
