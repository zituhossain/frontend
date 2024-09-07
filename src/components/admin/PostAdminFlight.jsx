import { setLoading } from "@/redux/authSlice";
import { FLIGHT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const PostAdminFlight = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, token } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    flightNumber: "",
    airline: "",
    origin: "",
    destination: "",
    date: "",
    time: "",
    price: 0,
    availableSeats: 0,
  });

  // fetch flight by id
  useEffect(() => {
    if (flightId) {
      const fetchFlightDetails = async () => {
        try {
          const res = await axios.get(`${FLIGHT_API_END_POINT}/${flightId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          const flightData = res?.data?.flight;
          setInput({
            flightNumber: flightData?.flightNumber,
            airline: flightData?.airline,
            origin: flightData?.origin,
            destination: flightData?.destination,
            date: flightData.date.split("T")[0],
            time: flightData?.time,
            price: flightData?.price,
            availableSeats: flightData?.availableSeats,
          });
        } catch (error) {
          toast.error(error?.response?.data?.message);
        }
      };
      fetchFlightDetails();
    }
  }, [flightId, token]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));

      if (flightId) {
        const res = await axios.put(
          `${FLIGHT_API_END_POINT}/${flightId}`,
          input,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        if (res?.data?.success) {
          toast.success(res?.data?.message);
          navigate("/admin/flights");
        }
      } else {
        const res = await axios.post(
          `${FLIGHT_API_END_POINT}/addFlight`,
          input,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        if (res?.data?.success) {
          toast.success(res?.data?.message);
          navigate("/admin/flights");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Flight Number</Label>
              <Input
                type="text"
                name="flightNumber"
                value={input.flightNumber}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Airline</Label>
              <Input
                type="text"
                name="airline"
                value={input.airline}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Origin</Label>
              <Input
                type="text"
                name="origin"
                value={input.origin}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Destination</Label>
              <Input
                type="text"
                name="destination"
                value={input.destination}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                name="date"
                value={input.date}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Time</Label>
              <Input
                type="text"
                name="time"
                value={input.time}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Price</Label>
              <Input
                type="text"
                name="price"
                value={input.price}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Available Seats</Label>
              <Input
                type="number"
                name="availableSeats"
                value={input.availableSeats}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-4">
              Post New Flight
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostAdminFlight;
