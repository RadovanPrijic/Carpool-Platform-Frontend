import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/store-hooks";
import { useMutation } from "@tanstack/react-query";
import { userActions } from "../user-slice";
import {
  deleteProfilePicture,
  uploadProfilePicture,
} from "../../../services/user-service";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

const ProfilePicturePage = () => {
  const userId = useAppSelector((state) => state.auth.userId);
  const userProfilePicture = useAppSelector(
    (state) => state.user.currentUser!.picture
  );
  const [profilePictureInput, setProfilePictureInput] =
    useState<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const { mutate: tryUploadProfilePicture } = useMutation({
    mutationFn: uploadProfilePicture,
    onSuccess: (picture) => {
      setProfilePictureInput(null);
      dispatch(userActions.uploadProfilePicture(picture));
    },
  });

  const { mutate: tryDeleteProfilePicture } = useMutation({
    mutationFn: deleteProfilePicture,
    onSuccess: () => {
      dispatch(userActions.deleteProfilePicture());
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfilePictureInput(event.target);
  };

  const handleUploadProfilePicture = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", profilePictureInput!.files![0]);
    tryUploadProfilePicture({ file: formData, userId });
  };

  const handleDeleteProfilePicture = () => {
    tryDeleteProfilePicture(userProfilePicture!.id);
  };

  return (
    <>
      <form onSubmit={handleUploadProfilePicture}>
        <Input
          label="Profile picture"
          id="profile-picture"
          name="profilePicture"
          type="file"
          value={profilePictureInput?.value ?? ""}
          onChange={handleInputChange}
          required
        />
        <Button label="Upload picture" type="submit" />
      </form>
      {userProfilePicture && (
        <div>
          <Button label="Delete picture" onClick={handleDeleteProfilePicture} />
        </div>
      )}
      {userProfilePicture && (
        <div>
          <img
            src={userProfilePicture.filePath}
            alt="Profile picture"
            style={{ width: "150px", height: "150px" }}
          />
        </div>
      )}
    </>
  );
};

export default ProfilePicturePage;
