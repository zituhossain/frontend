import { setAllAdminFlights } from "@/redux/flightSlice";
import { FLIGHT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminFlights = (page, limit) => {
  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(page || 1);

  useEffect(() => {
    const fetchAllAdminFlights = async () => {
      try {
        const res = await axios.get(
          `${FLIGHT_API_END_POINT}/getFlights?page=${currentPage}&limit=${limit}`,
          {
            withCredentials: true,
          }
        );

        if (res.data?.success) {
          dispatch(setAllAdminFlights(res.data?.flights));
          setTotalPages(res.data?.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllAdminFlights();
  }, [currentPage, dispatch, limit]);

  return { totalPages, currentPage, setCurrentPage };
};

export default useGetAllAdminFlights;
