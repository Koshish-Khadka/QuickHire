import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type user = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
};
export type stateType = {
  user: user | null;
  token: string | null;
};
const initialState: stateType = {
  user: null,
  token: null,
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: user; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCredentials, logout } = counterSlice.actions;

export default counterSlice.reducer;
