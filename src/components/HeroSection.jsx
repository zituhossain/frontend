import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/flightSlice";

const HeroSection = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchFlightHandler = () => {
    dispatch(
      setSearchedQuery({
        origin: origin || "",
        destination: destination || "",
        date: date || "",
      })
    );
    navigate("/browse");
  };

  return (
    <div className="text-center mt-16">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium">
          Find Your Perfect Flight
        </span>
        <h1 className="sm:text-3xl lg:text-4xl font-bold">
          Book Your <br /> Flight with{" "}
          <span className="text-[#6a38c2]">MyTrip</span>
        </h1>
        <div className="flex flex-col items-center mx-auto shadow-lg border border-gray-200 rounded-lg gap-4 p-6 sm:w-[80%] lg:w-[40%]">
          <input
            type="text"
            placeholder="Enter Origin"
            onChange={(e) => setOrigin(e.target.value)}
            value={origin}
            className="w-full outline-none border border-gray-300 p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Enter Destination"
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
            className="w-full outline-none border border-gray-300 p-2 rounded-md"
          />
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            className="w-full outline-none border border-gray-300 p-2 rounded-md"
          />
          <Button onClick={searchFlightHandler} className="rounded-full">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
