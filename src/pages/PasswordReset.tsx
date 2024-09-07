import { useSearchParams } from "react-router-dom";
import classes from "./Auth.module.css";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../services/auth-service";
import { useState } from "react";
import { PasswordDTO } from "../features/authentication/types";

const PasswordResetPage = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("userEmail");
  const resetToken = searchParams.get("resetToken");
  const [formData, setFormData] = useState<PasswordDTO>({
    password: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: resetPassword,
    onSuccess: async (response) => {
      console.log(response);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const passwordDTO: PasswordDTO = {
      ...formData,
    };
    if (email && resetToken) {
      mutate({
        email,
        resetToken: encodeURIComponent(resetToken),
        passwordDTO,
      });
    }
  };

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={handlePasswordChange}>
          <div className={classes.control}>
            <label htmlFor="password">Current password</label>
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
            <label htmlFor="new-password">New password</label>
            <input
              type="password"
              required
              id="new-password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="new-password-confirmation">
              New password confirmation
            </label>
            <input
              type="password"
              required
              id="new-password-confirmation"
              name="newPasswordConfirmation"
              value={formData.newPasswordConfirmation}
              onChange={handleInputChange}
            />
          </div>
          <button>Change password</button>
        </form>
      </section>
      <div style={{ color: "red" }}>
        <p>
          Your password has been:
          {resetToken && isSuccess && " CHANGED."}
          {isError && " SENT TO THE SHADOW REALM."}
        </p>
      </div>
    </main>
  );
};

export default PasswordResetPage;
