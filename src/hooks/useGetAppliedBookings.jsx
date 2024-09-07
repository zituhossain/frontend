import { setAllAppliedBookings } from "@/redux/bookingSlice";
import { BOOKING_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAppliedBookings = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchAppliedBookings = async () => {
      try {
        const res = await axios.get(`${BOOKING_API_END_POINT}/user`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res?.data?.success) {
          dispatch(setAllAppliedBookings(res?.data?.bookings));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppliedBookings();
  }, [dispatch, token]);
};

export default useGetAppliedBookings;
