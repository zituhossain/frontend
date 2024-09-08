import { useSelector } from "react-redux";
import LatestFlightCards from "./LatestFlightCards";
import useGetAllAdminFlights from "@/hooks/useGetAllAdminFlights";

const LatestFlights = () => {
  useGetAllAdminFlights();
  const { allAdminFlights } = useSelector((store) => store.flight);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="sm:text-lg lg:text-4xl font-bold text-center">
        <span className="text-[#6a38c2] ">Top</span> Flights
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {allAdminFlights.length <= 0 ? (
          <span>No Flight Available</span>
        ) : (
          allAdminFlights
            .slice(0, 6)
            .map((flight) => (
              <LatestFlightCards key={flight._id} flight={flight} />
            ))
        )}
      </div>
    </div>
  );
};

export default LatestFlights;
