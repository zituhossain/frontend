import PropTypes from "prop-types";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Flight = ({ flight }) => {
  console.log(flight);
  Flight.propTypes = {
    flight: PropTypes.object,
  };

  const navigate = useNavigate();
  const formatdate = new Date(flight?.date).toLocaleDateString();

  return (
    <div className="bg-white shadow-xl border border-gray-100 p-5 rounded-md cursor-pointer">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium">{flight?.airline}</h1>

        <Button variant="outline" size="icon" className="rounded-full">
          <Bookmark />
        </Button>
      </div>

      <div className="mt-2">
        <p>
          <strong>Departure:</strong> {flight?.origin}
        </p>
        <p>
          <strong>Destination:</strong> {flight?.destination}
        </p>
        <p>
          <strong>Price:</strong> {flight?.price} BDT
        </p>
        <p>
          <strong>Departure Time:</strong> {formatdate}
        </p>
      </div>
      <div className="flex gap-2 items-center mt-4">
        <Badge className="text-blue-500" variant="ghost">
          {flight?.availableSeats} Seats
        </Badge>
        <Badge className="text-red-500" variant="ghost">
          {flight?.price}
        </Badge>
      </div>
      <div className="flex gap-4 mt-4">
        <Button
          onClick={() => navigate(`/details/${flight?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default Flight;
