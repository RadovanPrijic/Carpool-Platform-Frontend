import { useMutation } from "@tanstack/react-query";
import { EmailDTO } from "../types";
import { initiateEmailChange } from "../../../services/auth-service";
import { useAppSelector } from "../../../hooks/store-hooks";
import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

const initialFormData: EmailDTO = {
  email: "",
  newEmail: "",
  newEmailConfirmation: "",
};

const EmailChangePage = () => {
  const [formData, setFormData] = useState<EmailDTO>(initialFormData);
  const userId = useAppSelector((state) => state.auth.userId);

  const { mutate: tryInitiateEmailChange } = useMutation({
    mutationFn: initiateEmailChange,
    onSuccess: () => {
      setFormData(initialFormData);
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInitiateEmailChange = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    tryInitiateEmailChange({ id: userId, emailDTO: formData });
  };

  return (
    <form onSubmit={handleInitiateEmailChange}>
      <Input
        label="Current email address"
        id="current-email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter your current email address ..."
        required
      />
      <Input
        label="New email address"
        id="new-email"
        name="newEmail"
        type="email"
        value={formData.newEmail}
        onChange={handleInputChange}
        placeholder="Enter your new email address ..."
        required
      />
      <Input
        label="New email address confirmation"
        id="new-email-confirmation"
        name="newEmailConfirmation"
        type="email"
        value={formData.newEmailConfirmation}
        onChange={handleInputChange}
        placeholder="Repeat your new email address ..."
        required
      />
      <Button label="Send change link" type="submit" />
    </form>
  );
};

export default EmailChangePage;
