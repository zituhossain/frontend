import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJob?.applications?.some((app) => app.applicant === user?._id) ||
    false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data?.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: singleJob?.applications
            ? [...singleJob.applications, { applicant: user?._id }]
            : [{ applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchsingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data?.success) {
          dispatch(setSingleJob(res.data?.job));
          setIsApplied(
            res.data?.job?.applications?.some(
              (app) => app.applicant === user?._id
            ) || false
          );
        }
      } catch (error) {
        console.log(error.data.message);
      }
    };

    fetchsingleJob();
  }, [dispatch, jobId, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex gap-2 items-center mt-4">
            <Badge className="text-blue-500" variant="ghost">
              {singleJob?.positions} Position
            </Badge>
            <Badge className="text-red-500" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-violet-600" variant="ghost">
              {singleJob?.salary}
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#38045a]"
          }`}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="font-medium py-4 border-b-2 border-b-gray-300">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {" "}
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {" "}
            {singleJob?.experience} yrs
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {" "}
            {singleJob?.salary}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {" "}
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {" "}
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
