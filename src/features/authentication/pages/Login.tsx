import { useNavigate, useNavigation } from "react-router";
import { useAppDispatch } from "../../../hooks/store-hooks.ts";
import { login } from "../../../services/auth-service.ts";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { LoginRequestDTO } from "../types.ts";
import { authActions } from "../auth-slice.ts";
import { userActions } from "../../users/user-slice.ts";
import { getUserById } from "../../../services/user-service.ts";
import { jwtDecode } from "jwt-decode";
import { MyJwtPayload } from "../../../utils/auth.ts";
import Input from "../../../components/Input.tsx";
import Button from "../../../components/Button.tsx";

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginRequestDTO>({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const { mutate: tryLogin } = useMutation({
    mutationFn: login,
    onSuccess: async (loginResponseData) => {
      const decoded = jwtDecode<MyJwtPayload>(loginResponseData.token);
      localStorage.setItem("token", loginResponseData.token);
      localStorage.setItem("expiration", decoded.exp.toString());
      dispatch(
        authActions.login({
          emailConfirmationStatus: loginResponseData.emailConfirmed,
          id: decoded.nameid,
        })
      );
      const userData = await getUserById(decoded.nameid);
      dispatch(userActions.setCurrentUser(userData));
      navigate("/");
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    tryLogin(formData);
  };

  return (
    <form onSubmit={handleLogin}>
      <Input
        label="Email address"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter your email address ..."
        required
      />
      <Input
        label="Password"
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Enter your password ..."
        required
      />
      <Button
        type="submit"
        label={navigation.state === "submitting" ? "Logging in ..." : "Log in"}
        disabled={navigation.state === "submitting"}
      />
    </form>
  );
};

export default LoginPage;
