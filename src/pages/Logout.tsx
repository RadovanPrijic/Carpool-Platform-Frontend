import { useNavigate } from "react-router";
import { authActions } from "../features/authentication/auth-slice";
import { userActions } from "../features/users/user-slice";
import { useAppDispatch } from "../hooks/store-hooks";
import { clearLocalStorage } from "../utils/auth";
import { useEffect } from "react";

const LogoutPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(authActions.logout());
    dispatch(userActions.clearCurrentUser());
    clearLocalStorage();
    navigate("/");
  }, [dispatch, navigate]);

  return null;
};

export default LogoutPage;
