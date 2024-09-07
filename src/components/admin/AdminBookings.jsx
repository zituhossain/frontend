import useGetAllAdminBookings from "@/hooks/useGetAllAdminBookings";
import { setSearchBookingByText } from "@/redux/bookingSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "../ui/input";
import AdminBookingsTable from "./AdminBookingsTable";
import Navbar from "../shared/Navbar";

const AdminBookings = () => {
  useGetAllAdminBookings(); // Hook to fetch all bookings data
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchBookingByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by user or flight number"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <AdminBookingsTable />
      </div>
    </div>
  );
};

export default AdminBookings;
