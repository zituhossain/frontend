/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);

  if (!user) {
    // If the user is not authenticated, redirect to login page
    return <Navigate to="/login" replace={true} />;
  }

  // If the user is authenticated, render the children components
  return children;
};

export default ProtectedRoute;
