import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from "../../../hooks/store-hooks";
import { initiateEmailConfirmation } from "../../../services/auth-service";

const UserProfilePage = () => {
  const userId = useAppSelector((state) => state.user.currentUser!.id);
  const emailConfirmed = useAppSelector((state) => state.auth.emailConfirmed);

  const { mutate: sendEmailConfirmationLink } = useMutation({
    mutationFn: initiateEmailConfirmation,
    onSuccess: async (response) => {
      console.log(response);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSendingEmailConfirmationLink = () => {
    sendEmailConfirmationLink(userId);
  };

  return (
    <>
      {!emailConfirmed && (
        <div>
          <p>Send email confirmation link:</p>
          <b onClick={handleSendingEmailConfirmationLink}>
            SEND CONFIRMATION LINK
          </b>
        </div>
      )}
    </>
  );
};

export default UserProfilePage;
