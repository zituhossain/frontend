import { logout } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { LogOut, User2, Menu, X } from "lucide-react"; // Added Menu and X for hamburger
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom"; // NavLink for active styling
import { toast } from "sonner";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data?.success) {
        dispatch(logout());
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="bg-white flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <h1 className="text-3xl font-bold">
            Flight<span className="text-[#f83002]">Booking</span>
          </h1>
        </div>

        {/* Hamburger Menu for mobile */}
        <div className="md:hidden flex items-center">
          <Button onClick={toggleMobileMenu} variant="ghost">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user?.role === "Admin" ? (
              <>
                <li>
                  <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                      isActive ? "bg-gray-200 p-2 rounded-md" : "p-2 rounded-md"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/flights"
                    className={({ isActive }) =>
                      isActive ? "bg-gray-200 p-2 rounded-md" : "p-2 rounded-md"
                    }
                  >
                    Flights
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/bookings"
                    className={({ isActive }) =>
                      isActive ? "bg-gray-200 p-2 rounded-md" : "p-2 rounded-md"
                    }
                  >
                    Bookings
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "bg-gray-200 p-2 rounded-md" : "p-2 rounded-md"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/flights"
                    className={({ isActive }) =>
                      isActive ? "bg-gray-200 p-2 rounded-md" : "p-2 rounded-md"
                    }
                  >
                    Flights
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6a38c2] hover:bg-[#2f0c6c]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-4">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.username}</h4>
                    </div>
                  </div>

                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user?.role === "User" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-gray-100 p-4">
            <ul className="flex flex-col gap-4">
              {user && user?.role === "Admin" ? (
                <>
                  <li>
                    <NavLink
                      to="/admin/dashboard"
                      onClick={toggleMobileMenu}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-gray-200 p-2 rounded-md"
                          : "p-2 rounded-md"
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/flights"
                      onClick={toggleMobileMenu}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-gray-200 p-2 rounded-md"
                          : "p-2 rounded-md"
                      }
                    >
                      Flights
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/bookings"
                      onClick={toggleMobileMenu}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-gray-200 p-2 rounded-md"
                          : "p-2 rounded-md"
                      }
                    >
                      Bookings
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/"
                      onClick={toggleMobileMenu}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-gray-200 p-2 rounded-md"
                          : "p-2 rounded-md"
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/flights"
                      onClick={toggleMobileMenu}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-gray-200 p-2 rounded-md"
                          : "p-2 rounded-md"
                      }
                    >
                      Flights
                    </NavLink>
                  </li>
                </>
              )}

              {!user ? (
                <div className="flex flex-col items-center gap-2">
                  <Link to="/login" onClick={toggleMobileMenu}>
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link to="/signup" onClick={toggleMobileMenu}>
                    <Button className="bg-[#6a38c2] hover:bg-[#2f0c6c]">
                      Signup
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button onClick={logoutHandler} variant="outline">
                    Logout
                  </Button>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
