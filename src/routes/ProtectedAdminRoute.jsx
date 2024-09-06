/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user === null || user?.role !== "recruiter") {
      navigate("/");
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedAdminRoute;
