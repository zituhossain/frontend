import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const AppliedJobTable = () => {
  const { allAppliedBookings } = useSelector((store) => store.bookings);
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Flight No.</TableHead>
            <TableHead>Airline</TableHead>
            <TableHead>Departure</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedBookings.length <= 0 ? (
            <span>You have not booked any flight yet.</span>
          ) : (
            allAppliedBookings.map((booked) => (
              <TableRow key={booked._id}>
                <TableCell>{booked?.flightId?.date.split("T")[0]}</TableCell>
                <TableCell>{booked.flightId?.flightNumber}</TableCell>
                <TableCell>{booked.flightId?.airline}</TableCell>
                <TableCell>{booked.flightId?.origin}</TableCell>
                <TableCell>{booked.flightId?.destination}</TableCell>
                <TableCell>{booked.flightId?.price}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      booked?.bookingStatus === "cancelled"
                        ? "bg-red-400"
                        : booked.bookingStatus === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {booked?.bookingStatus.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
