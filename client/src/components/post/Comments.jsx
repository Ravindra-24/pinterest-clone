import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteComment, updateComentLike } from "../../redux/action/comment";
import moment from "moment";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import Avatar from "../../layout/Avatar";
import { Link } from "react-router-dom";

const Comments = ({ comments, postId }) => {
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.authReducer.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCommentLike = (commentId) => {
    try {
      setLoading(false)
      if (!auth) return toast.error("Please Login to like the post");
      dispatch(updateComentLike(commentId, postId, navigate, setLoading));
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleCommentDelete = (commentId) => {
    try {
      setLoading(false)
      dispatch(deleteComment(commentId, postId, navigate, setLoading));
      // console.log(commentId, postId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {comments &&
        comments.map((comment) => (
          <div
            key={comment._id}
            className="m-4 flex mx-auto bg-white rounded-md h- shadow-md p-2 overflow-hidden md:max-w-full md:flex max-sm:w-full dark:bg-gray-700"
          >
            <div className=" md:flex-shrink-0 flex items-center rounded">
              <Avatar auth={comment} height={6} width={6}/>
            </div>
            <div className="p-2 md:w-1/2 md:flex-grow ">
              <div className="flex">
                <Link to={`/user/${comment?.user?._id}`} >
                <div
                  className={` tracking-wide text-[1rem]  font-semibold ${
                    comment?.user._id === auth?.id
                      ? "text-blue-500"
                      : "dark:text-white"
                  }`}
                >
                  {comment?.user?.firstName.charAt(0).toUpperCase() +
                    comment?.user?.firstName.slice(1) +
                    " " +
                    comment?.user?.lastName.charAt(0).toUpperCase() +
                    comment?.user?.lastName.slice(1)}
                </div>
                </Link>
                <p className="text-gray-600 text-xs ml-2 flex text-center dark:text-gray-300" style={{alignItems:'center'}}>
                  {moment(comment?.createdAt).fromNow()}
                </p>
              </div>
              <div className="">
                <p className="mt-2 text-gray-600 overflow-hidden whitespace-normal break-all dark:text-white">
                  {comment.commentText}
                </p>
              </div>
              <div className="flex mt-2">
                <p className="text-gray-600 text-sm dark:text-gray-300">
                  {comment?.likes?.length > 0
                    ? comment?.likes?.length + " Likes"
                    : ""}
                </p>
                <button
                  className="flex items-center focus:outline-none ml-4"
                  onClick={() => handleCommentLike(comment._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 mr-1 ${
                      comment?.likes?.includes(auth?.id)
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
                        comment?.likes?.includes(auth?.id)
                          ? "M5 12h14M12 5l7 7-7 7"
                          : "M12 4.5c-3.3 0-6 2.7-6 6 0 1.8.8 3.4 2 4.5l4 3.5 4-3.5c1.2-1.1 2-2.7 2-4.5 0-3.3-2.7-6-6-6zm0 10.5l-3.5 3-1.5-1.5 5-4.5 5 4.5-1.5 1.5-3.5-3z"
                      }
                    />
                  </svg>
                  <p className="text-gray-600 text-sm dark:text-gray-200">
                    {comment?.likes?.includes(auth?.id) ? "Liked" : "Like"}
                  </p>
                </button>
                {auth && auth.id === comment.user._id && (
                  <button
                    className="flex items-center focus:outline-none ml-4"
                    onClick={() => handleCommentDelete(comment._id)}
                  >
                    <p className="text-gray-600 text-sm dark:text-gray-200">
                      <FontAwesomeIcon icon={faTrash} /> delete
                    </p>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Comments;
