import { setAllAdminFlights } from "@/redux/flightSlice";
import { FLIGHT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminFlights = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminFlights = async () => {
      try {
        const res = await axios.get(`${FLIGHT_API_END_POINT}/getFlights`, {
          withCredentials: true,
        });

        if (res.data?.success) {
          dispatch(setAllAdminFlights(res.data?.flights));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllAdminFlights();
  }, [dispatch]);
};

export default useGetAllAdminFlights;
