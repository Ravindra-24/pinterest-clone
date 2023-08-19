import React from "react";
import { Link } from "react-router-dom";

const ProjectLogo = () => {
  return (
    <>
    <Link to={'/'}>
      <svg width="150" height="25" xmlns="http://www.w3.org/2000/svg">
        {/* <!-- Pin Shape --> */}
        <path d="M10 10 L0 0 L-10 10 L10 40 Z" fill="#E60023" />

        {/* <!-- Text --> */}
        <text x="20" y="20" font-family="Arial" font-size="14" fill="#000000">
          PINTERESTLike
        </text>
      </svg>
      </Link>
    </>
  );
};

export default ProjectLogo;
