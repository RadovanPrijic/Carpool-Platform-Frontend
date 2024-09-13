import { ChangeEvent } from "react";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import Input from "../../../components/Input";
import Textarea from "../../../components/TextArea";

interface UserFormProps {
  email?: string;
  password?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: string;
  profileBio?: string;
  chattinessPrefs?: string;
  musicPrefs?: string;
  smokingPrefs?: string;
  petsPrefs?: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const UserForm: React.FC<UserFormProps> = ({
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  birthDate,
  profileBio,
  chattinessPrefs,
  musicPrefs,
  smokingPrefs,
  petsPrefs,
  onSubmit,
  onChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      {email !== undefined && (
        <Input
          label="Email address"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={onChange}
          placeholder="Enter your email address ..."
          required
        />
      )}
      {password !== undefined && (
        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          placeholder="Enter your password ..."
          required
        />
      )}
      <Input
        label="First name"
        id="first-name"
        name="firstName"
        type="text"
        value={firstName}
        onChange={onChange}
        placeholder="Enter your first name ..."
        required
      />
      <Input
        label="Last name"
        id="last-name"
        name="lastName"
        type="text"
        value={lastName}
        onChange={onChange}
        placeholder="Enter your last name ..."
        required
      />
      <Input
        label="Phone number"
        id="phone-number"
        name="phoneNumber"
        type="tel"
        value={phoneNumber}
        onChange={onChange}
        placeholder="Enter your phone number ..."
        required
      />
      <Input
        label="Birth date"
        id="birth-date"
        name="birthDate"
        type="date"
        value={birthDate.split("T")[0]}
        onChange={onChange}
        required
      />
      <Textarea
        label="Profile biography (optional)"
        id="profile-bio"
        name="profileBio"
        value={profileBio ?? ""}
        onChange={onChange}
        placeholder="Tell us something about yourself ..."
      />
      <Dropdown
        label="Chattiness preferences (optional)"
        id="chattiness-prefs"
        name="chattinessPrefs"
        value={chattinessPrefs ?? ""}
        onChange={onChange}
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
        value={musicPrefs ?? ""}
        onChange={onChange}
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
        value={smokingPrefs ?? ""}
        onChange={onChange}
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
        value={petsPrefs ?? ""}
        onChange={onChange}
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
      <Button
        label={email !== undefined ? "Register" : "Edit user"}
        type="submit"
      />
    </form>
  );
};

export default UserForm;
