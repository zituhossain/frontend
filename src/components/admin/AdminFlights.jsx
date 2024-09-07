import useGetAllAdminFlights from "@/hooks/useGetAllAdminFlights";
import { setSearchFlightByText } from "@/redux/flightSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import AdminFlightsTable from "./AdminFlightsTable";

const AdminFlights = () => {
  useGetAllAdminFlights();
  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchFlightByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by airline, flight No."
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/flights/create")}>
            New Flight
          </Button>
        </div>
        <AdminFlightsTable />
      </div>
    </div>
  );
};

export default AdminFlights;
