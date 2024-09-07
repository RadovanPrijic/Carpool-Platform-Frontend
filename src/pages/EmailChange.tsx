import { useMutation } from "@tanstack/react-query";
import { EmailDTO } from "../features/authentication/types";
import classes from "./Auth.module.css";
import { initiateEmailChange } from "../services/auth-service";
import { useAppSelector } from "../hooks/store-hooks";
import { useState } from "react";

const EmailChangePage = () => {
  const [formData, setFormData] = useState<EmailDTO>({
    email: "",
    newEmail: "",
    newEmailConfirmation: "",
  });
  const id = useAppSelector((state) => state.auth.userId);

  const { mutate } = useMutation({
    mutationFn: initiateEmailChange,
    onSuccess: async (response) => {
      console.log(response);
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEmailChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailDTO: EmailDTO = {
      ...formData,
    };
    mutate({ id, emailDTO });
  };

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={handleEmailChange}>
          <div className={classes.control}>
            <label htmlFor="email">Current email address</label>
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
            <label htmlFor="new-email">New email address</label>
            <input
              type="email"
              required
              id="new-email"
              name="newEmail"
              value={formData.newEmail}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="new-email-confirmation">
              New email address confirmation
            </label>
            <input
              type="email"
              required
              id="new-email-confirmation"
              name="newEmailConfirmation"
              value={formData.newEmailConfirmation}
              onChange={handleInputChange}
            />
          </div>
          <button>Change email</button>
        </form>
      </section>
    </main>
  );
};

export default EmailChangePage;
