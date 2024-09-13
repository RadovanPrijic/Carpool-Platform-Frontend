import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from "../../../hooks/store-hooks";
import { initiateEmailConfirmation } from "../../../services/auth-service";
import { LoaderFunctionArgs, useLoaderData } from "react-router";
import { queryClient } from "../../../utils/api-config";
import { User } from "../types";
import { getUserById } from "../../../services/user-service";
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

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    throw new Error("User ID parameter is required.");
  }
  return queryClient.fetchQuery<User>({
    queryKey: ["user", params.id],
    queryFn: () => getUserById(params.id!),
  });
}

export default UserProfilePage;
