import { setSingleFlight } from "@/redux/flightSlice";
import { BOOKING_API_END_POINT, FLIGHT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Navbar from "./shared/Navbar";

<Navbar />;

const FlightDetails = () => {
  const { singleFlight } = useSelector((store) => store.flight);
  const { token } = useSelector((store) => store.auth);
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [seatClass, setSeatClass] = useState("Economy");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const flightId = params.id;
  const formatdate = new Date(singleFlight?.date).toLocaleDateString();

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

  const bookFlightHandler = async () => {
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        `${BOOKING_API_END_POINT}/addBooking`,
        {
          flightId,
          numberOfSeats,
          seatClass,
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
        setOpenPopup(false);
        // Mark the booking as confirmed
        setIsBookingConfirmed(true);
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
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

          <Dialog open={openPopup} onOpenChange={setOpenPopup}>
            <DialogTrigger asChild>
              <Button
                className="rounded-lg bg-[#7209b7] hover:bg-[#38045a]"
                disabled={isBookingConfirmed}
              >
                {isBookingConfirmed ? "Booking Confirmed" : "Book Now"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Book Your Flight</DialogTitle>
              <div className="my-4">
                <label className="block text-gray-700">Number of Seats</label>
                <input
                  type="number"
                  min="1"
                  value={numberOfSeats}
                  onChange={(e) => setNumberOfSeats(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Seat Class Selection */}
              <div className="my-4">
                <label className="block text-gray-700">Seat Class</label>
                <select
                  value={seatClass}
                  onChange={(e) => setSeatClass(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                  <option value="First Class">First Class</option>
                </select>
              </div>

              {/* Total Price Display */}
              <div className="my-4">
                <h1 className="font-bold text-gray-800">
                  Total Price:{" "}
                  <span className="text-blue-600">
                    {(
                      singleFlight?.price *
                      numberOfSeats *
                      (seatClass === "Business"
                        ? 1.5
                        : seatClass === "First Class"
                        ? 2
                        : 1)
                    ).toFixed(2)}{" "}
                    BDT
                  </span>
                </h1>
              </div>

              <DialogFooter>
                <Button
                  onClick={bookFlightHandler}
                  className="bg-[#7209b7] hover:bg-[#38045a]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Booking..." : "Confirm Booking"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
    </>
  );
};

export default FlightDetails;
