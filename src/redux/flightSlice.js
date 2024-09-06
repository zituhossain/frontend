import { createSlice } from "@reduxjs/toolkit";

const flightSlice = createSlice({
  name: "flight",
  initialState: {
    allFlights: [],
    singleFlight: null,
    searchedQuery: "",
  },
  reducers: {
    setAllFlights: (state, action) => {
      state.allFlights = action.payload;
    },

    setSingleFlight: (state, action) => {
      state.singleFlight = action.payload;
    },

    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});

export const { setAllFlights, setSingleFlight, setSearchedQuery } =
  flightSlice.actions;
export default flightSlice.reducer;
