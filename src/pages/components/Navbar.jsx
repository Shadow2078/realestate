import { Fragment, useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/logo/gharghaderi.png";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in from localStorage
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      setIsLoggedIn(true);
      setUserRole(user.role);
    } else {
      setIsLoggedIn(false);
      setUserRole("");
    }
  }, [navigate]);

  const getDashboardLink = () => {
    switch (userRole) {
      case "admin":
        return "/admindashboard";
      case "owner":
        return "/ownerdashboard";
      case "agent":
        return "/agentdashboard";
      case "buyer":
        return "/buyerdashboard";
      default:
        return "/dashboard";
    }
  };

  return (
    <Disclosure as="nav" className="bg-white sticky top-0 z-50 shadow-lg">
      {({ open, close }) => (
        <Fragment>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-2">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                <Disclosure.Button
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => (open ? close() : null)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-between">
                <div className="flex flex-shrink-0 items-center h-[50px]">
                  <Link to="/">
                    <img
                      className="h-[50px] lg:h-[70px]"
                      src={Logo}
                      alt="Ray Biner Real Estate"
                    />
                  </Link>
                </div>
                <div className="hidden md:flex md:space-x-10 list-none flex items-center">
                  <Link
                    to="/"
                    className={`text-base font-normal ${
                      activeLink === "Home" ? "text-green-500" : "text-gray-500"
                    } list-none hover:text-gray-900`}
                    onClick={() => {
                      setActiveLink("Home");
                      close();
                    }}
                  >
                    Home
                  </Link>
                  <Link
                    to="/Properties"
                    className={`text-base font-normal ${
                      activeLink === "Properties"
                        ? "text-green-500"
                        : "text-gray-500"
                    } list-none hover:text-gray-900`}
                    onClick={() => {
                      setActiveLink("Properties");
                      close();
                    }}
                  >
                    Properties
                  </Link>
                  <Link
                    to="/about"
                    className={`text-base font-normal ${
                      activeLink === "FAQ" ? "text-green-500" : "text-gray-500"
                    } list-none hover:text-gray-900`}
                    onClick={() => {
                      setActiveLink("FAQ");
                      close();
                    }}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    className={`text-base font-normal ${
                      activeLink === "Contact"
                        ? "text-green-500"
                        : "text-gray-500"
                    } list-none hover:text-gray-900`}
                    onClick={() => {
                      setActiveLink("Contact");
                      close();
                    }}
                  >
                    Contact
                  </Link>
                  {isLoggedIn ? (
                    <Link
                      to={getDashboardLink()}
                      className={`inline-flex items-center px-4 py-2 text-base text-white border border-transparent rounded-full cursor-pointer font-base hover:bg-gray-50 ${
                        activeLink === "Dashboard"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-gray-500 hover:bg-gray-600"
                      }`}
                      onClick={() => {
                        setActiveLink("Dashboard");
                        close();
                      }}
                      style={{ backgroundColor: "#72B944" }}
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Fragment>
                      <div className="inline-flex rounded-full shadow ml-2">
                        <Link
                          to="/login"
                          style={{ backgroundColor: "#72B944" }}
                          className={`inline-flex items-center px-4 py-2 text-base text-white border border-transparent rounded-full cursor-pointer font-base hover:bg-gray-50`}
                          onClick={() => {
                            setActiveLink("Login");
                            close();
                          }}
                        >
                          Login
                        </Link>
                      </div>
                      <div className="inline-flex rounded-full shadow ml-2">
                        <Link
                          to="/register"
                          style={{ backgroundColor: "#72B944" }}
                          className="inline-flex items-center px-4 py-2 text-base text-white border border-transparent rounded-full cursor-pointer font-base hover:bg-gray-50"
                          onClick={() => {
                            setActiveLink("Register");
                            close();
                          }}
                        >
                          Register
                        </Link>
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 ">
              <Link
                to="/"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={close}
              >
                Home
              </Link>
              <Link
                to="/Properties"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={close}
              >
                Properties
              </Link>
              <Link
                to="/about"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={close}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={close}
              >
                Contact
              </Link>
              {isLoggedIn ? (
                <Link
                  to={getDashboardLink()}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  onClick={close}
                  style={{ backgroundColor: "#72B944" }}
                >
                  Dashboard
                </Link>
              ) : (
                <Fragment>
                  <Link
                    to="/login"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={close}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={close}
                  >
                    Register
                  </Link>
                </Fragment>
              )}
            </div>
          </Disclosure.Panel>
        </Fragment>
      )}
    </Disclosure>
  );
}
