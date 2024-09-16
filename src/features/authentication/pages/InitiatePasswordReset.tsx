import { useMutation } from "@tanstack/react-query";
import { initiatePasswordReset } from "../../../services/auth-service";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useState } from "react";
import { useNavigation } from "react-router";

const InitiatePasswordResetPage = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const navigation = useNavigation();

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
      <Button
        type="submit"
        label={
          navigation.state === "submitting" ? "Sending ..." : "Send reset link"
        }
        disabled={navigation.state === "submitting"}
      />
    </form>
  );
};

export default InitiatePasswordResetPage;
