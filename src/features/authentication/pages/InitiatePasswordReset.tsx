import { useMutation } from "@tanstack/react-query";
import { initiatePasswordReset } from "../../../services/auth-service";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useState } from "react";

const InitiatePasswordResetPage = () => {
  const [emailInput, setEmailInput] = useState<string>("");

  const { mutate: tryInitiatePasswordReset } = useMutation({
    mutationFn: initiatePasswordReset,
    onSuccess: () => {
      setEmailInput("");
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value);
  };

  const handleInitiatePasswordReset = (event: React.FormEvent) => {
    event.preventDefault();
    tryInitiatePasswordReset(emailInput);
  };

  return (
    <form onSubmit={handleInitiatePasswordReset}>
      <Input
        label="Email address"
        id="email"
        name="email"
        type="email"
        value={emailInput}
        onChange={handleInputChange}
        placeholder="Enter your email address ..."
        required
      />
      <Button label="Send reset link" type="submit" />
    </form>
  );
};

export default InitiatePasswordResetPage;
