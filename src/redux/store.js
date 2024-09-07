import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";
import flightSlice from "./flightSlice";
import bookingSlice from "./bookingSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    flight: flightSlice,
    bookings: bookingSlice,

    job: jobSlice,
    company: companySlice,
    application: applicationSlice,
  },
});

export default store;
