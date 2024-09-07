import { createSlice } from "@reduxjs/toolkit";

const flightSlice = createSlice({
  name: "flight",
  initialState: {
    allFlights: [],
    allAdminFlights: [],
    singleFlight: null,
    searchFlightByText: "",
    searchedQuery: [],
  },
  reducers: {
    setAllFlights: (state, action) => {
      state.allFlights = action.payload;
    },

    setAllAdminFlights: (state, action) => {
      state.allAdminFlights = action.payload;
    },

    setSingleFlight: (state, action) => {
      state.singleFlight = action.payload;
    },
    setSearchFlightByText: (state, action) => {
      state.searchFlightByText = action.payload;
    },

    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});

export const {
  setAllFlights,
  setAllAdminFlights,
  setSingleFlight,
  setSearchFlightByText,
  setSearchedQuery,
} = flightSlice.actions;
export default flightSlice.reducer;
