import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const tokenFromStorage = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: userFromStorage,
    token: tokenFromStorage,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      // set user in local storage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setToken: (state, action) => {
      state.token = action.payload;
      // set token in local storage
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setLoading, setUser, setToken, logout } = authSlice.actions;

export default authSlice.reducer;
