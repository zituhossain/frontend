import FlightDetails from "@/components/FlightDetails";
import Flights from "@/components/Flights";
import AdminBookings from "@/components/admin/AdminBookings";
import AdminFlights from "@/components/admin/AdminFlights";
import PostAdminFlight from "@/components/admin/PostAdminFlight";
import { createBrowserRouter } from "react-router-dom";
import Browse from "../components/Browse";
import Home from "../components/Home";
import Profile from "../components/Profile";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },

  {
    path: "details/:id",
    element: <FlightDetails />,
  },
  {
    path: "browse",
    element: <Browse />,
  },
  {
    path: "flights",
    element: <Flights />,
  },
  {
    path: "profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },

  // Admin Routes

  {
    path: "admin/bookings",
    element: (
      <ProtectedAdminRoute>
        <AdminBookings />
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "admin/flights",
    element: (
      <ProtectedAdminRoute>
        <AdminFlights />
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "admin/flights/create",
    element: (
      <ProtectedAdminRoute>
        <PostAdminFlight />
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "admin/flights/edit/:flightId",
    element: (
      <ProtectedAdminRoute>
        <PostAdminFlight />
      </ProtectedAdminRoute>
    ),
  },
]);
