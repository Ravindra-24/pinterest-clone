import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updatePostLike } from "../../redux/action/post";

const PostLikes = ({ post }) => {
  const auth = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const handlePostLike = () => {
    try {
      if (!auth) return toast.error("Please Login to like the post");
      dispatch(updatePostLike(post._id));
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <p className="text-gray-600 text-sm dark:text-gray-300">
        {post?.likes?.length > 0 ? post?.likes?.length + " Likes" : ""}
      </p>
      <button
        className="flex items-center focus:outline-none ml-4 dark:text-gray-200"
        onClick={handlePostLike}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 mr-1 ${
            post?.likes?.includes(auth?.id) 
              ? "text-red-500 animate-like"
              : "text-gray-600 dark:text-gray-200"
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
              post?.likes?.includes(auth?.id)
                ? "M5 12h14M12 5l7 7-7 7"
                : "M12 4.5c-3.3 0-6 2.7-6 6 0 1.8.8 3.4 2 4.5l4 3.5 4-3.5c1.2-1.1 2-2.7 2-4.5 0-3.3-2.7-6-6-6zm0 10.5l-3.5 3-1.5-1.5 5-4.5 5 4.5-1.5 1.5-3.5-3z"
            }
          />
        </svg>
        <p className="text-gray-600 text-sm dark:text-gray-200">
          {post?.likes?.includes(auth?.id) ? "Liked" : "Like"}
        </p>
      </button>
    </div>
  );
};

export default PostLikes;
