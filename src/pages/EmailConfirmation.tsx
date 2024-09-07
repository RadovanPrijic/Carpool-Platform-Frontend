import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { confirmEmail } from "../services/auth-service";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../hooks/store-hooks";
import { authActions } from "../features/authentication/auth-slice";
import { userActions } from "../features/users/user-slice";

const EmailConfirmationPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("userId");
  const confirmationToken = searchParams.get("confirmationToken");
  const changeToken = searchParams.get("changeToken");
  const newEmail = searchParams.get("newEmail");

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: confirmEmail,
    onSuccess: async (response) => {
      console.log(response);
      if (confirmationToken) {
        dispatch(authActions.confirmEmail());
      } else {
        dispatch(userActions.changeUserEmail(newEmail!));
      }
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  useEffect(() => {
    if (id && confirmationToken) {
      console.log(confirmationToken);
      mutate({
        id,
        confirmationToken: encodeURIComponent(confirmationToken),
        emailChange: false,
      });
    } else if (id && changeToken && newEmail) {
      mutate({
        id,
        confirmationToken: encodeURIComponent(changeToken),
        emailChange: true,
        newEmail,
      });
    }
  }, [id, confirmationToken, changeToken, newEmail, mutate]);

  return (
    <>
      <div>
        <p>
          Your email has been:
          {confirmationToken && isSuccess && " CONFIRMED."}
          {changeToken && isSuccess && " CHANGED."}
          {isError && " SENT TO THE SHADOW REALM."}
        </p>
      </div>
    </>
  );
};

export default EmailConfirmationPage;
