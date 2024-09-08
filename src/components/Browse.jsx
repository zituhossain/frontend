import { useDispatch, useSelector } from "react-redux";
import Flight from "./Flight";
import Navbar from "./shared/Navbar";
import { useEffect, useState } from "react";
import { setSearchedQuery } from "@/redux/flightSlice";
import useGetAllFlights from "@/hooks/useGetAllFlights";

const Browse = () => {
  useGetAllFlights();
  const dispatch = useDispatch();
  const { allFlights, searchedQuery } = useSelector((store) => store.flight);
  const [filterFlights, setFilterFlights] = useState([]);

  useEffect(() => {
    dispatch(setSearchedQuery(""));
  }, [dispatch]);

  useEffect(() => {
    const filteredFlights =
      allFlights?.length > 0
        ? allFlights.filter((flight) => {
            if (!searchedQuery) return true;

            const matchOrigin = searchedQuery.origin
              ? flight?.origin
                  ?.toLowerCase()
                  .includes(searchedQuery.origin.toLowerCase())
              : true;

            const matchDestination = searchedQuery.destination
              ? flight?.destination
                  ?.toLowerCase()
                  .includes(searchedQuery.destination.toLowerCase())
              : true;

            const matchDate = searchedQuery.date
              ? new Date(flight.date).toDateString() ===
                new Date(searchedQuery.date).toDateString()
              : true;

            return matchOrigin && matchDestination && matchDate;
          })
        : [];

    setFilterFlights(filteredFlights);
  }, [searchedQuery, allFlights]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-20">
        {filterFlights.length <= 0 ? (
          <span>No flights found</span>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filterFlights.map((flight) => (
              <Flight key={flight._id} flight={flight} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
