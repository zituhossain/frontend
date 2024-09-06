import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Job = ({ job }) => {
  Job.propTypes = {
    job: PropTypes.object,
  };

  const navigate = useNavigate();
  // const jobId = 1;

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (24 * 60 * 60 * 1000));
  };

  return (
    <div className="bg-white shadow-xl border border-gray-100 p-5 rounded-md cursor-pointer">
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" size="icon" className="rounded-full">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="ghost" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} alt="@shadcn" />
          </Avatar>
        </Button>
        <div>
          <h1 className="text-lg font-medium">{job?.company?.name}</h1>
          <p className="text-gray-500 text-sm">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="text-lg font-bold my-2">{job?.title}</h1>
        <p className="text-gray-600 text-sm">{job?.description}</p>
      </div>
      <div className="flex gap-2 items-center mt-4">
        <Badge className="text-blue-500" variant="ghost">
          {job?.position} Position
        </Badge>
        <Badge className="text-red-500" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-violet-600" variant="ghost">
          {job?.salary}
        </Badge>
      </div>
      <div className="flex gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
