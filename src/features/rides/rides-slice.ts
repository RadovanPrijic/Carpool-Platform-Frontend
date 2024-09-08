import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ride } from "./types";

interface RidesState {
  rides?: Ride[];
}

const initialState: RidesState = {
  rides: undefined,
};

export const ridesSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {
    setRides: (state, action: PayloadAction<Ride[]>) => {
      state.rides = action.payload;
    },
  },
});

export const ridesActions = ridesSlice.actions;

export default ridesSlice.reducer;
