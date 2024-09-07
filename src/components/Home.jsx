import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import LatestFlights from "./LatestFlights";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";

const Home = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Admin") {
      navigate("/admin/flights");
    }
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      <LatestFlights />
      <Footer />
    </>
  );
};

export default Home;
