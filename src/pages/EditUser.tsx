import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../services/user-service";
import { UserUpdateDTO } from "../features/users/types";
import { useAppDispatch, useAppSelector } from "../hooks/store-hooks";
import { useState } from "react";
import classes from "./Auth.module.css";
import { userActions } from "../features/users/user-slice";

const EditUserPage = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser!);
  const {
    id,
    email,
    rating,
    createdAt,
    picture,
    notifications,
    ...initialState
  } = currentUser;
  const [formData, setFormData] = useState<UserUpdateDTO>({
    ...initialState,
    birthDate: new Date(initialState.birthDate),
  });

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: async () => {
      dispatch(
        userActions.setCurrentUser({
          ...formData,
          id,
          email,
          rating,
          createdAt,
          picture,
          notifications,
        })
      );
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
    const userUpdateDTO: UserUpdateDTO = {
      ...formData,
    };
    mutate({ id, userUpdateDTO });
  };

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={handleLogin}>
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
              defaultValue={formData.chattinessPrefs}
            >
              <option value=""></option>
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
              defaultValue={formData.musicPrefs}
            >
              <option value=""></option>
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
              defaultValue={formData.smokingPrefs}
            >
              <option value=""></option>
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
              defaultValue={formData.petsPrefs}
            >
              <option value=""></option>
              <option value="I adore pets!">I adore pets!</option>
              <option value="I only like certain kinds of pets.">
                I only like certain kinds of pets.
              </option>
              <option value="I prefer not to travel with pets.">
                I prefer not to travel with pets.
              </option>
            </select>
          </div>
          <button>Edit user</button>
        </form>
      </section>
    </main>
  );
};

export default EditUserPage;
