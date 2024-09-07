import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const AdminBookingsTable = () => {
  const { allAdminBookings, searchBookingByText } = useSelector(
    (store) => store.bookings
  );
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    const filteredBookings =
      (allAdminBookings?.length > 0 &&
        allAdminBookings?.filter((booking) => {
          if (!searchBookingByText) return true;
          return (
            booking?.userId?.username
              .toLowerCase()
              .includes(searchBookingByText.toLowerCase()) ||
            booking?.flightId?.flightNumber
              .toLowerCase()
              .includes(searchBookingByText.toLowerCase())
          );
        })) ||
      [];

    setFilteredBookings(filteredBookings);
  }, [allAdminBookings, searchBookingByText]);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Flight No.</TableHead>
            <TableHead>Airline</TableHead>
            <TableHead>Departure</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Seats</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Travel Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBookings?.length <= 0 ? (
            <span>No bookings found</span>
          ) : (
            filteredBookings?.map((booking) => (
              <TableRow key={booking?._id}>
                <TableCell>
                  <p>{booking?.userId?.username}</p>
                  <p className="text-sm text-blue-500">
                    {booking?.userId?.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking?.userId?.phoneNumber}
                  </p>
                </TableCell>
                <TableCell>{booking?.flightId?.flightNumber}</TableCell>
                <TableCell>{booking?.flightId?.airline}</TableCell>
                <TableCell>{booking?.flightId?.origin}</TableCell>
                <TableCell>{booking?.flightId?.destination}</TableCell>
                <TableCell>{booking?.numberOfSeats}</TableCell>
                <TableCell>{booking?.totalPrice}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      booking?.bookingStatus === "cancelled"
                        ? "bg-red-400"
                        : booking?.bookingStatus === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {booking?.bookingStatus.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <p>{new Date(booking?.travelDate).toLocaleDateString()}</p>
                  <p>{booking?.flightId?.time}</p>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminBookingsTable;
