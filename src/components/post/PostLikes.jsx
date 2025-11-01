import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updatePostLike } from "../../redux/action/post";
import { useNavigate } from "react-router";

const PostLikes = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handlePostLike = () => {
    try {
      setLoading(false);
      setIsLoading(true);
      if (!auth) {
        toast.error("Please Login to like the post");
        setIsLoading(false);
      } else {
        dispatch(updatePostLike(post._id,navigate, setLoading, setIsLoading));
      }
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
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
        {isLoading ? (
          <>
            {" "}
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-3 text-gray-800 animate-spin"
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
        )}
        <p className="text-gray-600 text-sm dark:text-gray-200">
          {post?.likes?.includes(auth?.id) ? "Liked" : "Like"}
        </p>
      </button>
    </div>
  );
};

export default PostLikes;
