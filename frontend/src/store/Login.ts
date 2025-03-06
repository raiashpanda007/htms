import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: typeof window !== "undefined" ? localStorage.getItem("login") === "true" : false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
      localStorage.setItem("login", action.payload.toString()); // Store in local storage
    },
    logout: (state) => {
      state.login = false;
      localStorage.removeItem("login"); // Remove from local storage on logout
    },
  },
});

export const { setLogin, logout } = loginSlice.actions;
export default loginSlice.reducer;