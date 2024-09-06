import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";
import flightSlice from "./flightSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,

    job: jobSlice,
    flight: flightSlice,

    company: companySlice,

    application: applicationSlice,
  },
});

export default store;
