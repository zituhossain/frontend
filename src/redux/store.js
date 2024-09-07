import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import bookingSlice from "./bookingSlice";
import flightSlice from "./flightSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    flight: flightSlice,
    bookings: bookingSlice,
  },
});

export default store;
