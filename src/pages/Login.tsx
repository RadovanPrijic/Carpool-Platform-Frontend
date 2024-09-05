import { LoginRequestDTO } from "../features/authentication/types.ts";
import { UserUpdateDTO } from "../features/users/types.ts";
import { useAppDispatch } from "../hooks/hooks.ts";
import { login } from "../services/authService.ts";
import { updateUser } from "../services/user-service.ts";
import classes from "./Auth.module.css";

const Login = () => {
  // const dispatch = useAppDispatch();

  const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // dispatch(authActions.login());
    // const loginRequestDTO: LoginRequestDTO = {
    //   email: "radovanprijic7@gmail.com",
    //   password: "rasica123",
    // };
    // login(loginRequestDTO);
    // const userUpdate: UserUpdateDTO = {
    //   firstName: "Rakson",
    //   lastName: "Hefe",
    //   phoneNumber: "432423423",
    //   birthDate: new Date(),
    // };
    // updateUser("f2bf8e40-bc1c-4699-8857-4871b7f8f50c", userUpdate);
  };

  // const logoutHandler = () => {
  //   dispatch(authActions.logout());
  // };

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Login;
