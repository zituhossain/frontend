import { setSingleFlight } from "@/redux/flightSlice";
import { BOOKING_API_END_POINT, FLIGHT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const FlightDetails = () => {
  const { singleFlight } = useSelector((store) => store.flight);
  const { token } = useSelector((store) => store.auth);
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [travelDate, setTravelDate] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const flightId = params.id;
  const formatdate = new Date(singleFlight?.date).toLocaleDateString();

  console.log("ztoken", token);

  useEffect(() => {
    const fetchSingleFlight = async () => {
      try {
        const res = await axios.get(`${FLIGHT_API_END_POINT}/${flightId}`, {
          withCredentials: true,
        });
        if (res.data?.success) {
          dispatch(setSingleFlight(res.data?.flight));
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      }
    };

    fetchSingleFlight();
  }, [dispatch, flightId]);

  //   const bookNowHandler = () => {
  //     // Redirect to booking page with flight ID
  //     window.location.href = `/booking/${flightId}`;
  //   };

  const bookFlightHandler = async () => {
    try {
      const res = await axios.post(
        `${BOOKING_API_END_POINT}/addBooking`,
        {
          flightId,
          numberOfSeats,
          travelDate,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data?.success) {
        toast.success(res.data.message);
        navigate(`/booking-confirmation/${res.data.booking._id}`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleFlight?.title}</h1>
          <div className="flex gap-2 items-center mt-4">
            <Badge className="text-blue-500" variant="ghost">
              {singleFlight?.availableSeats} Seats Available
            </Badge>

            <Badge className="text-violet-600" variant="ghost">
              {singleFlight?.price} per seat
            </Badge>
          </div>
        </div>

        <input
          type="number"
          min="1"
          value={numberOfSeats}
          onChange={(e) => setNumberOfSeats(e.target.value)}
        />
        <input
          type="date"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
        />

        <Button
          onClick={bookFlightHandler}
          className="rounded-lg bg-[#7209b7] hover:bg-[#38045a]"
        >
          Book Now
        </Button>
      </div>
      <h1 className="font-medium py-4 border-b-2 border-b-gray-300">
        Flight Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Flight Number:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleFlight?.flightNumber}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Airline:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleFlight?.airline}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Departure:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleFlight?.origin}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Destination:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleFlight?.destination}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Departure Date & Time:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {formatdate} {singleFlight?.time}
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Available Seats:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleFlight?.availableSeats}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Price:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleFlight?.price} BDT
          </span>
        </h1>
      </div>
    </div>
  );
};

export default FlightDetails;
