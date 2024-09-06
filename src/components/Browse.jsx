import { useDispatch, useSelector } from "react-redux";
import Flight from "./Flight"; // Assuming you have a Flight component similar to Job
import Navbar from "./shared/Navbar";
import { useEffect, useState } from "react";
import { setSearchedQuery } from "@/redux/flightSlice";
import useGetAllFlights from "@/hooks/useGetAllFlights"; // Fetch flights based on query

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
            return (
              flight?.origin
                ?.toLowerCase()
                .includes(searchedQuery.origin.toLowerCase()) &&
              flight?.destination
                ?.toLowerCase()
                .includes(searchedQuery.destination.toLowerCase())
            );
          })
        : [];

    setFilterFlights(filteredFlights);
  }, [searchedQuery, allFlights]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
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
