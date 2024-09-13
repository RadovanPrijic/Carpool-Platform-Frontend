import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../../services/auth-service";
import { useState } from "react";
import { PasswordDTO } from "../types";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

const initialFormData: PasswordDTO = {
  password: "",
  newPassword: "",
  newPasswordConfirmation: "",
};

const PasswordResetPage = () => {
  const [formData, setFormData] = useState<PasswordDTO>(initialFormData);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("userEmail");
  const resetToken = searchParams.get("resetToken");

  const { mutate: tryResetPassword } = useMutation({
    mutationFn: resetPassword,
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

  const handleResetPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email && resetToken) {
      tryResetPassword({
        email,
        resetToken: encodeURIComponent(resetToken),
        passwordDTO: formData,
      });
    }
  };

  return (
    <form onSubmit={handleResetPassword}>
      <Input
        label="Current password"
        id="current-password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Enter your current password ..."
        required
      />
      <Input
        label="New password"
        id="new-password"
        name="newPassword"
        type="password"
        value={formData.newPassword}
        onChange={handleInputChange}
        placeholder="Enter your new password ..."
        required
      />
      <Input
        label="New password confirmation"
        id="new-password-confirmation"
        name="newPasswordConfirmation"
        type="password"
        value={formData.newPasswordConfirmation}
        onChange={handleInputChange}
        placeholder="Repeat your new password ..."
        required
      />
      <Button label="Change password" type="submit" />
    </form>
  );
};

export default PasswordResetPage;
