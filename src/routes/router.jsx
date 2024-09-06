import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import Jobs from "../components/Jobs";
import Browse from "../components/Browse";
import Profile from "../components/Profile";
import JobDescription from "../components/JobDescription";
import ProtectedRoute from "./ProtectedRoute";
import Companies from "@/components/admin/Companies";
import CompanyCreate from "@/components/admin/CompanyCreate";
import CompanySetup from "@/components/admin/CompanySetup";
import AdminJobs from "@/components/admin/AdminJobs";
import PostAdminJob from "@/components/admin/PostAdminJob";
import Applicants from "@/components/admin/Applicants";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import FlightDetails from "@/components/FlightDetails";

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
    path: "jobs",
    element: <Jobs />,
  },
  {
    path: "description/:id",
    element: <JobDescription />,
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
    path: "profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },

  // Admin Routes
  {
    path: "admin/companies",
    element: (
      <ProtectedAdminRoute>
        <Companies />
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "admin/companies/create",
    element: (
      <ProtectedAdminRoute>
        <CompanyCreate />
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "admin/companies/:id",
    element: (
      <ProtectedAdminRoute>
        <CompanySetup />
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "admin/jobs",
    element: (
      <ProtectedAdminRoute>
        <AdminJobs />
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "admin/jobs/create",
    element: (
      <ProtectedAdminRoute>
        <PostAdminJob />
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "admin/jobs/:id/applicants",
    element: (
      <ProtectedAdminRoute>
        <Applicants />
      </ProtectedAdminRoute>
    ),
  },
]);
