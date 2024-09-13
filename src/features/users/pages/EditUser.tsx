import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../../services/user-service";
import { UserUpdateDTO } from "../types";
import { useAppDispatch, useAppSelector } from "../../../hooks/store-hooks";
import { useState } from "react";
import { userActions } from "../user-slice";
import UserForm from "../components/UserForm";

const EditUserPage = () => {
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
  const [formData, setFormData] = useState<UserUpdateDTO>({ ...initialState });
  const dispatch = useAppDispatch();

  const { mutate: tryUpdateUser } = useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      dispatch(userActions.setCurrentUser({ ...updatedUser }));
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

  const handleUpdateUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    tryUpdateUser({ id, userUpdateDTO: formData });
  };

  return (
    <UserForm
      firstName={formData.firstName}
      lastName={formData.lastName}
      phoneNumber={formData.phoneNumber}
      birthDate={formData.birthDate}
      profileBio={formData.profileBio}
      chattinessPrefs={formData.chattinessPrefs}
      musicPrefs={formData.musicPrefs}
      smokingPrefs={formData.smokingPrefs}
      petsPrefs={formData.petsPrefs}
      onSubmit={handleUpdateUser}
      onChange={handleInputChange}
    />
  );
};

export default EditUserPage;
