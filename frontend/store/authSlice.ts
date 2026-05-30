import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// type user = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
//   role: string;
//   isOnboarded: boolean;
// };
type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  bio?: string;
  role: string;
  location?: string;
  isVerified: boolean;
  isOnboarded: boolean;
};

export type stateType = {
  user: User | null;
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
      action: PayloadAction<{ user: User; token: string }>,
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
