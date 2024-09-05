import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/auth-slice";
import userReducer from "../features/users/user-slice";

const store = configureStore({
  reducer: { auth: authReducer, user: userReducer },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export default store;
