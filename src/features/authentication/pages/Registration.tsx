import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { register } from "../../../services/auth-service";
import { RegistrationRequestDTO } from "../types";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Textarea from "../../../components/TextArea";
import Dropdown from "../../../components/Dropdown";

const initialFormData: RegistrationRequestDTO = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  birthDate: "",
};

const RegistrationPage = () => {
  const [formData, setFormData] =
    useState<RegistrationRequestDTO>(initialFormData);

  const { mutate: tryRegister } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      setFormData(initialFormData);
    },
  });

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    tryRegister(formData);
  };

  return (
    <form onSubmit={handleRegister}>
      <Input
        label="Email address"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter your email address ..."
        required
      />
      <Input
        label="Password"
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Enter your password ..."
        required
      />
      <Input
        label="First name"
        id="first-name"
        name="firstName"
        type="text"
        value={formData.firstName}
        onChange={handleInputChange}
        placeholder="Enter your first name ..."
        required
      />
      <Input
        label="Last name"
        id="last-name"
        name="lastName"
        type="text"
        value={formData.lastName}
        onChange={handleInputChange}
        placeholder="Enter your last name ..."
        required
      />
      <Input
        label="Phone number"
        id="phone-number"
        name="phoneNumber"
        type="tel"
        value={formData.phoneNumber}
        onChange={handleInputChange}
        placeholder="Enter your phone number ..."
        required
      />
      <Input
        label="Birth date"
        id="birth-date"
        name="birthDate"
        type="date"
        value={formData.birthDate}
        onChange={handleInputChange}
        required
      />
      <Textarea
        label="Profile biography (optional)"
        id="profile-bio"
        name="profileBio"
        value={formData.profileBio ?? ""}
        onChange={handleInputChange}
        placeholder="Tell us something about yourself ..."
      />
      <Dropdown
        label="Chattiness preferences (optional)"
        id="chattiness-prefs"
        name="chattinessPrefs"
        value={formData.chattinessPrefs ?? ""}
        onChange={handleInputChange}
        options={[
          { label: "I love chatting!", value: "I love chatting!" },
          {
            label: "I chat only when I feel like it.",
            value: "I chat only when I feel like it.",
          },
          {
            label: "I prefer silence while driving.",
            value: "I prefer silence while driving.",
          },
        ]}
      />
      <Dropdown
        label="Music preferences (optional)"
        id="music-prefs"
        name="musicPrefs"
        value={formData.musicPrefs ?? ""}
        onChange={handleInputChange}
        options={[
          { label: "Let there be music!", value: "Let there be music!" },
          {
            label: "I like music only when I'm in the right mood.",
            value: "I like music only when I'm in the right mood.",
          },
          {
            label: "Silence is golden.",
            value: "Silence is golden.",
          },
        ]}
      />
      <Dropdown
        label="Smoking preferences (optional)"
        id="smoking-prefs"
        name="smokingPrefs"
        value={formData.smokingPrefs ?? ""}
        onChange={handleInputChange}
        options={[
          {
            label: "I have no problem with smoking in the car.",
            value: "I have no problem with smoking in the car.",
          },
          {
            label: "Smoke pauses outside the car are fine with me.",
            value: "Smoke pauses outside the car are fine with me.",
          },
          {
            label: "No smoking, please.",
            value: "No smoking, please.",
          },
        ]}
      />
      <Dropdown
        label="Pets preferences (optional)"
        id="pets-prefs"
        name="petsPrefs"
        value={formData.petsPrefs ?? ""}
        onChange={handleInputChange}
        options={[
          { label: "I adore pets!", value: "I adore pets!" },
          {
            label: "I only like certain kinds of pets.",
            value: "I only like certain kinds of pets.",
          },
          {
            label: "I prefer not to travel with pets.",
            value: "I prefer not to travel with pets.",
          },
        ]}
      />
      <Button label="Register" type="submit" />
    </form>
  );
};

export default RegistrationPage;
