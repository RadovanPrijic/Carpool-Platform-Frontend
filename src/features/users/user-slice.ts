import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./types";

interface UserState {
  currentUser?: User;
}

const initialState: UserState = {
  currentUser: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = undefined;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
