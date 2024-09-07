import { FLIGHT_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export const useDeleteFlight = () => {
  const { token } = useSelector((store) => store.auth);
  const deleteFlight = async (flightId) => {
    try {
      const response = await axios.delete(
        `${FLIGHT_API_END_POINT}/${flightId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.success) {
        toast.success(response.data.message);
        return response.data;
      }
    } catch (error) {
      console.error("Error deleting flight:", error);
      toast.error(error.response.data.message);
    }
  };

  return { deleteFlight };
};
