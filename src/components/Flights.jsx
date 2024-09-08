import { setSearchedQuery } from "@/redux/flightSlice";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Flight from "./Flight";
import Navbar from "./shared/Navbar";
import useGetAllAdminFlights from "@/hooks/useGetAllAdminFlights";
import Pagination from "./shared/Pagination";

const Flights = () => {
  // useGetAllAdminFlights();
  const [page, setPage] = useState(1);
  const limit = 2; // Number of flights per page
  const { totalPages, currentPage, setCurrentPage } = useGetAllAdminFlights(
    page,
    limit
  );

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
    if (!allAdminFlights || !searchedQuery || !searchedQuery.priceRange) return;

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
            priceRange &&
            flight?.price >= priceRange[0] &&
            flight?.price <= priceRange[1];

          return matchAirline && matchPrice;
        })) ||
      [];

    setFilterFlights(filteredFlight);
  }, [searchedQuery, allAdminFlights]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setCurrentPage(newPage); // Update current page in the hook
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="sm:flex flex-col lg:flex-row gap-5">
          <div className="w-100%">
            <FilterCard />
          </div>
          {filterFlights.length <= 0 ? (
            <span>Flight not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flights;
