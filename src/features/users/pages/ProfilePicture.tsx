import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/store-hooks";
import { useMutation } from "@tanstack/react-query";
import { userActions } from "../user-slice";
import {
  deleteProfilePicture,
  uploadProfilePicture,
} from "../../../services/user-service";
import classes from "./Auth.module.css";

const ProfilePicturePage = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.userId);
  const userProfilePicture = useAppSelector(
    (state) => state.user.currentUser!.picture
  );
  const profilePictureRef = useRef<HTMLInputElement | null>(null);

  const { mutate: upload } = useMutation({
    mutationFn: uploadProfilePicture,
    onSuccess: async (picture) => {
      dispatch(userActions.uploadProfilePicture(picture));
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const { mutate: clearPicture } = useMutation({
    mutationFn: deleteProfilePicture,
    onSuccess: async (response) => {
      console.log(response);
      dispatch(userActions.deleteProfilePicture());
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleProfilePictureUpload = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", profilePictureRef.current!.files![0]);
    console.log(formData);
    upload({ file: formData, userId });
  };

  const handleProfilePictureDeletion = () => {
    clearPicture(userProfilePicture!.id);
  };

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={handleProfilePictureUpload}>
          <div className={classes.control}>
            <label htmlFor="profile-picture">Profile picture</label>
            <input
              type="file"
              required
              id="profile-picture"
              name="profile-picture"
              ref={profilePictureRef}
            />
          </div>
          <button>Upload your new profile picture</button>
        </form>
        <button onClick={handleProfilePictureDeletion}>
          Delete profile picture
        </button>
      </section>
      {userProfilePicture !== undefined && (
        <img
          src={userProfilePicture.filePath}
          alt="Profile picture"
          style={{ width: "150px", height: "150px" }}
        />
      )}
    </main>
  );
};

export default ProfilePicturePage;
