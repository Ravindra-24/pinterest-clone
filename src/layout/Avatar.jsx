import React from "react";

const Avatar = ({auth, height, width}) => {
  return (
    <>
      {auth?.user?.profilePicture ? (
        
        <span className={`rounded-full h-${height} w-${width} mr-2`}>
                      <img
                        src={auth?.user?.profilePicture}
                        alt="Profile"
                        className={`h-${height} w-${width} rounded-full object-cover`}
                      />
                      </span>
                    ) : (
                        <span className={`rounded-full h-${height} w-${width} flex items-center justify-center bg-gradient-to-r from-pink-500 to-yellow-500 mr-2`}>
                          <span className="text-white font-medium">
                            {auth?.user?.firstName?.charAt(0).toUpperCase()}
                          </span>
                        </span>
                    )}
    </>
  );
};

export default Avatar;
