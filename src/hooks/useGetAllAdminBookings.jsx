import { setAllAdminBookings } from "@/redux/bookingSlice";
import { BOOKING_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllAdminBookings = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchAllAdminBookings = async () => {
      try {
        const res = await axios.get(`${BOOKING_API_END_POINT}/admin`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        console.log(res.data);
        if (res.data?.success) {
          dispatch(setAllAdminBookings(res.data?.bookings));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllAdminBookings();
  }, [dispatch, token]);
};

export default useGetAllAdminBookings;
