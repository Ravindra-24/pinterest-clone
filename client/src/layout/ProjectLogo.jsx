import React from "react";
import { Link } from "react-router-dom";

const ProjectLogo = () => {
  return (
    <>
      <Link to={"/"}>
        <svg width="70" height="25" xmlns="http://www.w3.org/2000/svg">
          {/* <!-- Pin Shape --> */}
          <path d="M10 10 L0 0 L-10 10 L10 40 Z" fill="#E60023" />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
          <text
            x="20"
            y="20"
            fontFamily="lato"
            fontSize="15"
            className=" max-sm:text-xs fill-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
            // className="text-grey-900 dark:text-white"
            stroke="url(#gradient)"
            strokeWidth={1}
          >
            PIN
          </text>
        </svg>
      </Link>
    </>
  );
};

export default ProjectLogo;

export const AuthLogo = () => {
  return (
    <>
      <Link to={"/"}>
        <svg  width="160" height="25" xmlns="http://www.w3.org/2000/svg">
          {/* <!-- Pin Shape --> */}
          <path d="M10 10 L0 0 L-10 10 L10 40 Z" fill="#E60023" />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
          <text
            x="20"
            y="20"
            fontFamily="lato"
            fontSize="20"
            className=" max-sm:text-xs fill-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
            // className="text-grey-900 dark:text-white"
            stroke="url(#gradient)"
            strokeWidth={1}
          >
            PINTERESTLike
          </text>
        </svg>
      </Link>
    </>
  )
}
