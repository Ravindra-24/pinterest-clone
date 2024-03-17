import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { followUser, getUser } from "../../redux/action/user";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-hot-toast";
import Avatar from "../../layout/Avatar";

const ProfileHeader = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((state) => state.authReducer.user);
  const user = useSelector((state) => state.userReducer);

  const handleClick = (userId) => {
    try {
      setLoading(false);
      setIsLoading(true);
      if (!auth) {
        setIsLoading(false);
        toast.error("Please login to follow user");
      }
      if (auth) {
        if (auth?.id !== userId) {
          dispatch(followUser(userId, setLoading, setIsLoading));
        } else {
          navigate(`/user/edit/${userId}`);
          setIsLoading(false);
        }
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    dispatch({ type: "GET_USER", payload: null });
    dispatch(getUser(id, setLoading));
    // setLoading(false);
  }, [dispatch, id]);
  return (
    <>
      {loading ? (
        <></>
      ) : (
        <header className=" p-4 border-b border-gray-300 bg-gray-200 dark:bg-slate-900 dark:text-gray-50 mt-20">
          <div className="flex flex-col items-center md:flex-row md:items-center m-5">
            <Avatar auth={user} height={20} width={20} />
            <div className="text-center md:text-left md:flex-grow m-3">
              <h1 className="font-bold text-lg ">
                {user.user?.firstName?.charAt(0).toUpperCase() +
                  user.user?.firstName?.slice(1) +
                  " " +
                  user.user?.lastName?.charAt(0).toUpperCase() +
                  user.user?.lastName?.slice(1)}
              </h1>
              <p className="text-gray-600 text-sm dark:text-gray-200 mb-3">
                <FontAwesomeIcon icon={faBirthdayCake} className="mr-2" />
                Joined {moment(user.user?.createdAt).fromNow()}{" "}
              </p>
              <p className="text-gray-600 dark:text-gray-200">
                {user.user?.posts?.length + " Posts"} • {user.user?.followers?.length}{" "}
                Followers • {user.user?.following?.length} following
              </p>
              <p className="text-gray-600 dark:text-gray-200">{user.user?.bio}</p>
            </div>
          </div>
          <div className="flex">
            <button
              className="w-full md:w-auto text-white focus:ring-4 shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none  active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
              // bg-blue-500 text-white px-4 py-1 rounded mt-2 block w-full md:w-auto

              onClick={() => handleClick(user?.user._id)}
            >
              {isLoading ? (
                <>
                  {" "}
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-5 h-5 mr-3 text-gray-800 animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="white"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                </>
              ) : (
                <>
                  {auth?.id === user.user?._id ? (
                    <>
                      <FontAwesomeIcon icon={faPen} /> Edit Profile
                    </>
                  ) : user.user?.followers?.includes(auth?.id) ? (
                    "following"
                  ) : user.user?.following?.includes(auth?.id) ? (
                    "follow back"
                  ) : (
                    "follow"
                  )}
                </>
              )}
            </button>
          </div>
        </header>
      )}
    </>
  );
};

export default ProfileHeader;
