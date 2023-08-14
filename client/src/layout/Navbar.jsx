import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Avatar from "./Avatar";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const auth = useSelector((state) => state.authReducer);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <nav
      style={{
        background: "#0E131F",
      }}
      className="bg-white-800 shadow-md w-full"
    >
      <div className="w-full mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="inset-y-0 left-0 flex items-center">
            <img
              className="block lg:hidden h-10 w-auto"
              src="https://www.svgrepo.com/show/384978/donut-doughnut-sweet-dessert-food-fastfood.svg"
              alt="Logo"
            />
            <img
              className="hidden lg:block h-10 w-auto"
              src="https://www.svgrepo.com/show/384978/donut-doughnut-sweet-dessert-food-fastfood.svg"
              alt="Logo"
            />
          </div>
          <div className="flex w-2/3 items-center">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                style={{
                  borderBottom: "1px solid #ffbf00",
                }}
                type="text"
                id="simple-search"
                className="
                rounded-md
                focus:outline-none
                bg-white-50  text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  "
                placeholder="Search post by name..."
                required=""
              />
            </div>
          </div>

          <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              {auth.loaded && auth.token ? (
                <div className="flex items-center justify-center">
                  {location.pathname !== "/create-post" && (
                    <Link
                      to="/create-post"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium mr-3"
                    >
                      New +
                    </Link>
                  )}
                  <>
                    <Avatar auth={auth}/>
                  </>
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
                        className="ml-1 border-[#fuchsia] m-2 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-gradient-to-r hover:from-pink-600 hover:to-yellow-600"
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
