import { setAllFlights } from "@/redux/flightSlice";
import { FLIGHT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllFlights = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.flight);

  useEffect(() => {
    const fetchAllFlights = async () => {
      try {
        const res = await axios.get(
          `${FLIGHT_API_END_POINT}/search?origin=${searchedQuery.origin}&destination=${searchedQuery.destination}&date=${searchedQuery.date}`,
          {
            withCredentials: true,
          }
        );
        if (res.data?.success) {
          dispatch(setAllFlights(res.data?.flights));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllFlights();
  }, [searchedQuery, dispatch]);
};

export default useGetAllFlights;
