import { useDispatch, useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useEffect, useState } from "react";
import { setSearchedQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";
const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    dispatch(setSearchedQuery(""));
  }, [dispatch]);

  useEffect(() => {
    // Update filtered jobs based on searchedQuery

    const filteredJobs =
      (allJobs?.length > 0 &&
        allJobs.filter((job) => {
          if (!searchedQuery) return true;
          return (
            job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job?.location?.toLowerCase().includes(searchedQuery.toLowerCase())
          );
        })) ||
      [];

    setFilterJobs(filteredJobs);
  }, [searchedQuery, allJobs]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    key={job._id}
                  >
                    <Job job={job} />
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

export default Jobs;
