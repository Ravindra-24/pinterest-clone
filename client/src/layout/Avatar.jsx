import React from "react";

const Avatar = ({auth}) => {
  return (
    <>
      <button
        className="max-w-xs bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 rounded-full flex items-center text-sm focus:outline-none focus:shadow-solid"
        id="user-menu"
        aria-label="User menu"
        aria-haspopup="true"
      >
        <span className="sr-only">Open user menu</span>
        <span className="rounded-full h-8 w-8 flex items-center justify-center">
          <span className="text-white font-medium">
            {auth?.user?.initials?.toUpperCase()}
          </span>
        </span>
      </button>
    </>
  );
};

export default Avatar;
