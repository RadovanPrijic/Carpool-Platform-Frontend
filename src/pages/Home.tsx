import { useAppDispatch, useAppSelector } from "../hooks/store-hooks";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getTokenDuration, clearLocalStorage } from "../utils/auth";
import { authActions } from "../features/authentication/auth-slice";
import { userActions } from "../features/users/user-slice";
import { useQuery } from "@tanstack/react-query";
import { GetFilteredRidesArgs, getLocations } from "../services/ride-service";
import { Location } from "../features/rides/types";
import RideFilter from "../features/rides/RideFilter";

const HomePage = () => {
  const token = useLoaderData();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();

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
      dispatch(authActions.logout());
      dispatch(userActions.clearCurrentUser());
      clearLocalStorage();
    }, tokenDuration);
  }, [token, dispatch]);

  return (
    <>
      <div>
        <Link to="register">Register |</Link>
        <Link to="login"> Login </Link>
        <Link to="logout">| Logout </Link>
      </div>
      <div>
        <Link to="user-profile">User profile |</Link>
        <Link to="profile-picture"> Profile picture |</Link>
        <Link to="edit-user"> Edit user </Link>
        <Link to="change-email">| Change email |</Link>
        <Link to="initiate-password-reset"> Reset password</Link>
      </div>
      <div>
        <p>
          CURRENT AUTH STATE:
          {isAuthenticated ? " Authenticated" : " Not authenticated"} | CURRENT
          USER:
          {currentUser ? ` ${currentUser.firstName}` : " Nobody's home"}
        </p>
      </div>
      <RideFilter />
    </>
  );
};

export default HomePage;
