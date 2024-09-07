import { useRef } from "react";
import classes from "./Auth.module.css";
import { useMutation } from "@tanstack/react-query";
import { initiatePasswordReset } from "../services/auth-service";

const InitiatePasswordResetPage = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);

  const { mutate } = useMutation({
    mutationFn: initiatePasswordReset,
    onSuccess: async (response) => {
      console.log(response);
    },
  });

  const handleSendingPasswordResetLink = (event: React.FormEvent) => {
    event.preventDefault();
    mutate(emailRef.current!.value);
  };

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={handleSendingPasswordResetLink}>
          <div className={classes.control}>
            <label htmlFor="email">Current email address</label>
            <input
              type="email"
              required
              id="email"
              name="email"
              ref={emailRef}
            />
          </div>
          <button>SEND PASSWORD RESET LINK</button>
        </form>
      </section>
    </main>
  );
};

export default InitiatePasswordResetPage;
