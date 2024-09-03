import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyJwtPayload } from "../../utils/auth";

interface AuthState {
  isAuthenticated: boolean;
  emailConfirmed: boolean;
  userId?: string;
  userEmail?: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  emailConfirmed: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<MyJwtPayload>) => {
      state.isAuthenticated = true;
      state.userId = action.payload.nameid;
      state.userEmail = action.payload.email;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = undefined;
      state.userEmail = undefined;
    },
    confirmEmail: (state) => {
      state.emailConfirmed = true;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
