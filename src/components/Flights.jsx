import { setSearchedQuery } from "@/redux/flightSlice";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Flight from "./Flight";
import Navbar from "./shared/Navbar";
import useGetAllAdminFlights from "@/hooks/useGetAllAdminFlights";

const Flights = () => {
  useGetAllAdminFlights();
  const dispatch = useDispatch();
  const { allAdminFlights, searchedQuery } = useSelector(
    (store) => store.flight
  );
  const [filterFlights, setFilterFlights] = useState([]);

  useEffect(() => {
    dispatch(
      setSearchedQuery({ selectedAirlines: [], priceRange: [0, 500000] })
    );
  }, [dispatch]);

  useEffect(() => {
    const { selectedAirlines, priceRange } = searchedQuery;

    const filteredFlight =
      (allAdminFlights?.length > 0 &&
        allAdminFlights.filter((flight) => {
          const matchAirline =
            !selectedAirlines || selectedAirlines.length === 0
              ? true
              : selectedAirlines.some((query) =>
                  flight?.airline?.toLowerCase().includes(query.toLowerCase())
                );

          const matchPrice =
            flight?.price >= priceRange[0] && flight?.price <= priceRange[1];

          return matchAirline && matchPrice;
        })) ||
      [];

    setFilterFlights(filteredFlight);
  }, [searchedQuery, allAdminFlights]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterFlights.length <= 0 ? (
            <span>Flight not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterFlights.map((flight) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    key={flight._id}
                  >
                    <Flight flight={flight} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flights;
