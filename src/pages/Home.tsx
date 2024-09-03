import { useAppSelector } from "../hooks/hooks";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLoaderData, useSubmit } from "react-router-dom";
import { getTokenDuration, clearLocalStorage } from "../utils/auth";

const Home = () => {
  const token = useLoaderData();
  const submit = useSubmit();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      clearLocalStorage();
      return;
    }

    const tokenDuration = getTokenDuration();
    if (!tokenDuration) {
      return;
    }

    setTimeout(() => {
      clearLocalStorage();
    }, tokenDuration);
  }, [token, submit]);

  return (
    <div>
      <Link to="login">Login</Link>
      <p>STATE: {isAuthenticated ? "AUTH TRUE" : "AUTH FALSE"}</p>
    </div>
  );
};

export default Home;
