import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

const LatestFlightCards = ({ flight }) => {
  LatestFlightCards.propTypes = {
    flight: PropTypes.object,
  };

  const navigate = useNavigate();

  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = new Date(flight?.date).toLocaleDateString(
    "en-GB",
    options
  );

  return (
    <div
      onClick={() => navigate(`/details/${flight?._id}`)}
      className="bg-white shadow-xl border border-gray-100 p-5 rounded-md cursor-pointer"
    >
      <div className="flex items-center gap-2 my-2">
        {/* <Button className="p-6" variant="ghost" size="icon">
          <Avatar>
            <AvatarImage src={flight?.company?.logo} alt="@shadcn" />
          </Avatar>
        </Button> */}
        <div>
          <h1 className="text-lg font-medium">{flight?.airline}</h1>
          <p className="text-gray-500 text-sm">{flight?.flightNumber}</p>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold my-2">
          {flight?.origin} - {flight?.destination}
        </h3>
        <p className="text-gray-600 text-sm">
          <span className="text-lg">{formattedDate}</span> - {flight?.time}
        </p>
      </div>
      <div className="flex gap-2 items-center mt-4">
        <Badge className="text-blue-500" variant="ghost">
          {flight?.availableSeats} Seats
        </Badge>
        <Badge className="text-red-500" variant="ghost">
          {flight?.price} BDT
        </Badge>
      </div>
    </div>
  );
};

export default LatestFlightCards;
