import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProjectLogo from "./ProjectLogo";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faBars, faCircleArrowUp, faPenToSquare, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.authReducer);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <nav className="bg-white-800 shadow-md w-full dark:bg-gray-700 bg-gray-200 p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <ProjectLogo />
        </div>
        <Search />
        <div className="hidden md:block">
          <Link
            to={"/about"}
            className=" text-gray-900 dark:text-gray-50 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium mr-3"
          >
            About Us
          </Link>
        </div>
        {auth && auth?.token && (
          <div className="md:hidden ml-3">
            <Link to={`/user/${auth?.user?.id}`}>
              <Avatar auth={auth} />
            </Link>
          </div>
        )}
        {/* Hamburger menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="ml-2 dark:text-gray-100 text-gray-900 hover:text-gray-300 focus:outline-none ease-in-out transition duration-300"
          >
            {menuOpen ? (
              <FontAwesomeIcon icon={faXmark} width={"30"} height={"40"} />
            ) : (
              <FontAwesomeIcon icon={faBars} width={"30"} height={"40"}/>
            )}
          </button>
        </div>

        {/* Navigation links for medium screens and larger */}
        <div
          className={`hidden md:flex space-x-4 ${
            menuOpen ? "block md:block" : "hidden"
          }`}
        >
          {auth.loaded && auth.token ? (
            <div className="flex items-center justify-center">
              {location.pathname !== "/create-post" && (
                <Link
                  to="/create-post"
                  className="text-gray-900 dark:text-gray-50 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium mr-3"
                >
                  New+
                </Link>
              )}
            </div>
          ) : (
            <div className="flex item-center">
              {location.pathname === "/login" ||
              location.pathname === "/signup" ||
              location.pathname === "/reset-password" ||
              location.pathname === "/forgot-password" ? (
                <></>
              ) : (
                <>
                  <button
                    className=" inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
                    // hover:from-green-400 hover:to-blue-500
                    type="button"
                    data-te-ripple-init=""
                    data-te-ripple-color="light"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                  <button
                    className=" border-[#fuchsia] ml-2 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-900 dark:text-gray-50 hover:text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-gradient-to-r hover:from-pink-600 hover:to-yellow-600 max-sm:hidden"
                    type="button"
                    data-te-ripple-init=""
                    data-te-ripple-color="light"
                    onClick={() => navigate("/signup")}
                  >
                    Signup
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Avatar and logout button */}
        <div className={`md:flex hidden items-center `}>
          {auth && auth?.token && (
            <>
              <Link to={`/user/${auth?.user?.id}`}>
                <Avatar auth={auth} />
              </Link>

              <svg
                onClick={handleLogout}
                className="ml-4 hover:cursor-pointer transition duration-300 transform hover:scale-110"
                xmlns="http://www.w3.org/2000/svg"
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#eab308" />
                  </linearGradient>
                </defs>
                <path
                  d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5"
                  className="fill-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
                  stroke="url(#gradient)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu for md:screen */}
      <div
        className={`mt-5 md:hidden flex-col items-center ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        {auth && auth?.token ? (
          <>
            <Link
              to={`/user/${auth?.user?.id}`}
              className="text-gray-900 dark:text-gray-50 hover:bg-gray-700 hover:text-white block py-2 rounded-md text-sm font-medium"
            ><FontAwesomeIcon icon={faUser} className="mr-2"/>
              Profile
            </Link>
            <Link
              to={`/user/edit/${auth?.user?.id}`}
              className="text-gray-900 dark:text-gray-50 hover:bg-gray-700 hover:text-white block py-2 rounded-md text-sm font-medium"
            ><FontAwesomeIcon icon={faPenToSquare} className="mr-2"/>
              Edit profile
            </Link>
            <Link
              to={`/create-post`}
              className="text-gray-900 dark:text-gray-50 hover:bg-gray-700 hover:text-white block py-2 rounded-md text-sm font-medium"
            ><FontAwesomeIcon icon={faCircleArrowUp} className="mr-2"/>
              New +
            </Link>
            <Link
              to="/about"
              className="text-gray-900 dark:text-gray-50 hover:bg-gray-700 hover:text-white block py-2 rounded-md text-sm font-medium"
            ><FontAwesomeIcon icon={faAddressCard} className="mr-2" />
              About Us
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/about"
              className="text-gray-900 dark:text-gray-50 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium mr-3"
            >
              About Us
            </Link>
          </>
        )}

        <div className="flex items-center mt-4 flex-col">
          {auth && auth?.token ? (
            <button
              className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                className="m-2 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
                // hover:from-green-400 hover:to-blue-500
                type="button"
                data-te-ripple-init=""
                data-te-ripple-color="light"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="ml-1 border-[#fuchsia] m-2 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-900 dark:text-gray-50 hover:text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-gradient-to-r after:from-pink-600 after:to-yellow-600 "
                type="button"
                data-te-ripple-init=""
                data-te-ripple-color="light"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
