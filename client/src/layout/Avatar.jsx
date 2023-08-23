import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Avatar = ({auth}) => {
  const navigate =useNavigate();
  // const user = useSelector((state) => state.user);
  return (
    <>
      {auth?.profilePicture ? (
        
        <span className="rounded-full h-8 w-8 flex items-center justify-center">
                      <img
                        src={auth?.profilePicture}
                        alt="Profile"
                        className="w-8 h-8 rounded-full mr-2 object-cover"
                      />
                      </span>
                    ) : (
                      <button
                        className="max-w-xs bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 rounded-full flex items-center text-sm focus:outline-none focus:shadow-solid mr-2"
                        id="user-menu"
                        aria-label="User menu"
                        aria-haspopup="true"
                      >
                        <span className="sr-only">Open user menu</span>
                        <span className="rounded-full h-8 w-8 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {auth?.user?.initials.toUpperCase()}
                          </span>
                        </span>
                      </button>
                    )}
    </>
  );
};

export default Avatar;
