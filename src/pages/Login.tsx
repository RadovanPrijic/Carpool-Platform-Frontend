import { useNavigate } from "react-router";
import { useAppDispatch } from "../hooks/store-hooks.ts";
import { login } from "../services/auth-service.ts";
import classes from "./Auth.module.css";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { LoginRequestDTO } from "../features/authentication/types.ts";
import { authActions } from "../features/authentication/auth-slice.ts";
import { userActions } from "../features/users/user-slice.ts";
import { getUserById } from "../services/user-service.ts";
import { jwtDecode } from "jwt-decode";
import { MyJwtPayload } from "../utils/auth.ts";

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginRequestDTO>({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: async (loginResponse) => {
      const decoded = jwtDecode<MyJwtPayload>(loginResponse.token);
      localStorage.setItem("token", loginResponse.token);
      localStorage.setItem("expiration", decoded.exp.toString());
      dispatch(
        authActions.login({
          emailConfirmationStatus: loginResponse.emailConfirmed,
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

    const loginRequestDTO: LoginRequestDTO = {
      ...formData,
    };

    mutate(loginRequestDTO);
  };

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={handleLogin}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
