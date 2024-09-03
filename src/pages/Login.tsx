import { useAppDispatch } from "../hooks/hooks.ts";
import { login } from "../services/fetch";
import classes from "./Auth.module.css";

const Login = () => {
  const dispatch = useAppDispatch();

  const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // dispatch(authActions.login());
    login("radovanprijic7@gmail.com", "rasica123");
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
