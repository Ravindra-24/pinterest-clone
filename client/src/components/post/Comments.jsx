import React, { useState } from "react";

const Comments = ({ comment }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-2 overflow-hidden md:max-w-full md:flex">
      <div className=" md:flex-shrink-0 flex items-center rounded">
        <div
          className="
          w-10
          h-10
          bg-red-500
          rounded-full
          flex
          items-center
          justify-center
          font-bold
          text-white
        "
        >
          KG
        </div>
      </div>
      <div className="p-4 md:w-1/2 md:flex-grow">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          {comment.author}
        </div>
        <p className="mt-2 text-gray-600">{comment.content}</p>
        <button
          className="flex items-center focus:outline-none"
          onClick={handleLike}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 mr-1 ${
              liked ? "text-red-500 animate-like" : "text-gray-600"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                liked
                  ? "M5 12h14M12 5l7 7-7 7"
                  : "M12 4.5c-3.3 0-6 2.7-6 6 0 1.8.8 3.4 2 4.5l4 3.5 4-3.5c1.2-1.1 2-2.7 2-4.5 0-3.3-2.7-6-6-6zm0 10.5l-3.5 3-1.5-1.5 5-4.5 5 4.5-1.5 1.5-3.5-3z"
              }
            />
          </svg>
          <p className="text-gray-600 text-sm">{liked ? "Liked" : "Like"}</p>
        </button>
      </div>
    </div>
  );
};

export default Comments;