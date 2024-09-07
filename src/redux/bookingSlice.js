import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    allAdminBookings: [],
    allAppliedBookings: [],
    searchBookingByText: "",
    searchedQuery: "",
  },
  reducers: {
    setAllAdminBookings: (state, action) => {
      state.allAdminBookings = action.payload;
    },

    setAllAppliedBookings: (state, action) => {
      state.allAppliedBookings = action.payload;
    },

    setSearchBookingByText: (state, action) => {
      state.searchBookingByText = action.payload;
    },

    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});

export const {
  setAllAdminBookings,
  setAllAppliedBookings,
  setSearchBookingByText,
  setSearchedQuery,
} = bookingSlice.actions;

export default bookingSlice.reducer;
