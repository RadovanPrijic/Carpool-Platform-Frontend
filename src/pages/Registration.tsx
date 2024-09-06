import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { register } from "../services/auth-service";
import { RegistrationRequestDTO } from "../features/authentication/types";
import classes from "./Auth.module.css";

interface RegistrationFormData {
  email: string;
  password: string;
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

const RegistrationPage = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthDate: new Date(),
    profileBio: undefined,
    chattinessPrefs: undefined,
    musicPrefs: undefined,
    smokingPrefs: undefined,
    petsPrefs: undefined,
  });

  let registered: boolean = false;
  const { mutate } = useMutation({
    mutationFn: register,
    onSuccess: async () => {
      registered = true;
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    if (name !== "birthDate") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      const dateString = value;
      const dateObject = new Date(dateString);
      setFormData((prevData) => ({
        ...prevData,
        birthDate: dateObject,
      }));
    }
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const registrationRequestDTO: RegistrationRequestDTO = {
      ...formData,
    };

    mutate(registrationRequestDTO);
  };

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={handleLogin}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="first-name">First name</label>
            <input
              type="text"
              required
              id="first-name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="last-name">Last name</label>
            <input
              type="text"
              required
              id="last-name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="phone-number">Phone number</label>
            <input
              type="tel"
              required
              id="phone-number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="birth-date">Birth date</label>
            <input
              type="date"
              required
              id="birth-date"
              name="birthDate"
              value={formData.birthDate.toISOString().split("T")[0]}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="profile-bio">Profile biography (optional)</label>
            <textarea
              id="profile-bio"
              name="profileBio"
              rows={8}
              cols={20}
              value={formData.profileBio}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="chattiness-prefs">
              Chattiness preferences (optional)
            </label>
            <select
              id="chattiness-prefs"
              name="chattinessPrefs"
              value={formData.chattinessPrefs}
              onChange={handleInputChange}
              defaultValue=""
            >
              <option value="" disabled></option>
              <option value="I love talking!">I love chatting!</option>
              <option value="I chat only when I'm in the mood.">
                I chat only when I'm in the mood.
              </option>
              <option value="I prefer silence while driving.">
                I prefer silence while driving.
              </option>
            </select>
          </div>
          <div className={classes.control}>
            <label htmlFor="music-prefs">Music preferences (optional)</label>
            <select
              id="music-prefs"
              name="musicPrefs"
              value={formData.musicPrefs}
              onChange={handleInputChange}
              defaultValue=""
            >
              <option value="" disabled></option>
              <option value="Let there be music!">Let there be music!</option>
              <option value="I like music only when I'm in the mood.">
                I listen to music only when I'm in the mood.
              </option>
              <option value="Silence is golden.">Silence is golden.</option>
            </select>
          </div>
          <div className={classes.control}>
            <label htmlFor="smoking-prefs">
              Smoking preferences (optional)
            </label>
            <select
              id="smoking-prefs"
              name="smokingPrefs"
              value={formData.smokingPrefs}
              onChange={handleInputChange}
              defaultValue=""
            >
              <option value="" disabled></option>
              <option value="I have no problem with smoking in the car.">
                I have no problem with smoking in the car.
              </option>
              <option value="Smoke pauses outside the car are fine with me.">
                Smoke pauses are fine with me.
              </option>
              <option value="No smoking, please.">No smoking, please.</option>
            </select>
          </div>
          <div className={classes.control}>
            <label htmlFor="pets-prefs">Pets preferences (optional)</label>
            <select
              id="pets-prefs"
              name="petsPrefs"
              value={formData.petsPrefs}
              onChange={handleInputChange}
              defaultValue=""
            >
              <option value="" disabled></option>
              <option value="I adore pets!">I adore pets!</option>
              <option value="I only like certain kinds of pets.">
                I only like certain kinds of pets.
              </option>
              <option value="I prefer not to travel with pets.">
                I prefer not to travel with pets.
              </option>
            </select>
          </div>
          <button>Register</button>
        </form>
        {registered && (
          <p>
            "You have been successfully registered. Check your email address for
            an email confirmation link."
          </p>
        )}
      </section>
    </main>
  );
};

export default RegistrationPage;
