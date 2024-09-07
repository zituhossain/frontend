import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useDeleteFlight } from "@/hooks/useDeleteFlight";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

const AdminFlightsTable = () => {
  const navigate = useNavigate();

  const { allAdminFlights, searchFlightByText } = useSelector(
    (store) => store.flight
  );
  const [filterFlights, setFilterFlights] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [flightToDelete, setFlightToDelete] = useState(null);
  const { deleteFlight } = useDeleteFlight();

  useEffect(() => {
    const filteredflight =
      (allAdminFlights?.length > 0 &&
        allAdminFlights?.filter((flight) => {
          if (!searchFlightByText) return true;
          return (
            flight?.airline
              .toLowerCase()
              .includes(searchFlightByText.toLowerCase()) ||
            flight?.flightNumber
              .toLowerCase()
              .includes(searchFlightByText.toLowerCase())
          );
        })) ||
      [];

    setFilterFlights(filteredflight);
  }, [allAdminFlights, searchFlightByText]);

  // handle delete flight
  const handleDelete = async () => {
    try {
      await deleteFlight(flightToDelete?._id);
      setShowModal(false);
      setFilterFlights((prev) =>
        prev.filter((flight) => flight?._id !== flightToDelete?._id)
      );
    } catch (error) {
      console.error("Error deleting flight:", error);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent Added Flights</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Flight No.</TableHead>
            <TableHead>Airline</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Available Seats</TableHead>

            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterFlights?.length <= 0 ? (
            <span>You have not registered any flight yet</span>
          ) : (
            filterFlights?.map((flight) => (
              <tr key={flight?._id}>
                <TableCell>
                  {flight?.date.split("T")[0]} ({flight?.time})
                </TableCell>
                <TableCell>{flight?.flightNumber}</TableCell>
                <TableCell>{flight?.airline}</TableCell>
                <TableCell>{flight?.origin}</TableCell>
                <TableCell>{flight?.destination}</TableCell>
                <TableCell>{flight?.price}</TableCell>
                <TableCell>{flight?.availableSeats}</TableCell>

                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/admin/flights/edit/${flight?._id}`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => {
                          setShowModal(true);
                          setFlightToDelete(flight);
                        }}
                        className="flex items-center gap-2 w-fit cursor-pointer pt-4"
                      >
                        <Trash2 className="w-4" />
                        <span>Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))
          )}
        </TableBody>
      </Table>
      {/* Delete Confirmation Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div>
            <p>Are you sure you want to delete this flight?</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFlightsTable;
