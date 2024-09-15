import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from "../../../hooks/store-hooks";
import { initiateEmailConfirmation } from "../../../services/auth-service";
import { useLoaderData } from "react-router";
import { User } from "../types";
import Button from "../../../components/Button";

const UserProfilePage = () => {
  const user = useLoaderData() as User;
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const userId = useAppSelector((state) => state.user.currentUser?.id);
  const emailConfirmed = useAppSelector((state) => state.auth.emailConfirmed);
  const isProfileOwner = isAuthenticated && userId === user.id;

  const { mutate: tryInitiateEmailConfirmation } = useMutation({
    mutationFn: initiateEmailConfirmation,
  });

  const handleInitiateEmailConfirmation = () => {
    if (userId) {
      tryInitiateEmailConfirmation(userId);
    }
  };

  return (
    <>
      {isProfileOwner && !emailConfirmed && (
        <Button
          label="Send confirmation link"
          onClick={handleInitiateEmailConfirmation}
        />
      )}
    </>
  );
};

export default UserProfilePage;
