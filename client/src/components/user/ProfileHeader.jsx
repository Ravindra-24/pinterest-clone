import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import ColorfulLoader from "../../layout/spinner/spinner";
import { followUser } from "../../redux/action/user";
import { useNavigate } from "react-router";

const ProfileHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authReducer.user);
  const user = useSelector((state) => state.userReducer);

  const handleClick = (userId) => {
    if (auth?.id !== userId) {
      dispatch(followUser(userId));
    } else {
      navigate(`/user/edit/${userId}`);
    }
  };
  return (
    <>
      {user !== null ? (
        <header className=" p-4 border-b border-gray-300 bg-gray-200 dark:bg-gray-800 dark:text-gray-50">
          <div className="flex flex-col items-center md:flex-row md:items-center m-5 ">
            {user && user?.profilePicture ? (
              <img
                className="w-16 h-16 rounded-full mb-2 md:mr-2 md:mb-0"
                src={user?.profilePicture}
                alt="Profile"
              />
            ) : (
              <div
                className="max-w-xs bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 rounded-full flex items-center text-sm focus:outline-none focus:shadow-solid"
                id="user-menu"
              >
                <span className="rounded-full h-14 w-14 flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user?.firstName?.charAt(0).toUpperCase()}
                    {user?.lastName?.charAt(0).toUpperCase()}
                  </span>
                </span>
              </div>
            )}
            <div className="text-center md:text-left md:flex-grow m-3">
              <h1 className="font-bold text-lg ">
                {user?.firstName?.charAt(0).toUpperCase() +
                  user?.firstName?.slice(1) +
                  " " +
                  user?.lastName?.charAt(0).toUpperCase() +
                  user?.lastName?.slice(1)}
              </h1>
              <p className="text-gray-600 text-sm dark:text-gray-200 mb-3">
                <FontAwesomeIcon icon={faBirthdayCake} className="mr-2" />
                Joined {moment(user?.createdAt).fromNow()}{" "}
              </p>
              <p className="text-gray-600 dark:text-gray-200">
                {user?.posts?.length + " Posts"} • {user?.followers?.length}{" "}
                Followers • {user?.following?.length} following
              </p>
            </div>
          </div>
          <div className="flex">
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded mt-2 block w-full md:w-auto"
              onClick={() => handleClick(user._id)}
            >
              {auth?.id !== user?._id ? (
                "Follow"
              ) : (
                <>
                  <FontAwesomeIcon icon={faPen} /> Edit Profile
                </>
              )}
            </button>
          </div>
        </header>
      ) : (
        <ColorfulLoader />
      )}
    </>
  );
};

export default ProfileHeader;
