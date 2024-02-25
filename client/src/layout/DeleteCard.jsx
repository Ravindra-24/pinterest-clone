import React from "react";
import { deletePost } from "../redux/action/post";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const DeleteCard = ({ post, setProgress, setShowDelete }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePostDelete = () => {
    try {
      dispatch(deletePost(post, setProgress));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowDelete(false);
      navigate("/");
    }
  };

  const handleClose = () => {
    setShowDelete(false);
  };

  return (
    <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-gradient-to-r from-pink-500 to-yellow-500 dark:border-white border-2 border-spacing-1 border-gray-900 shadow-md rounded-lg p-4 h-fit ">
        <h2 className="text-xl font-bold mb-4 dark:text-gray-100 text-gray-900 ">
          Delete Post
        </h2>
        <p className="dark:text-gray-100 text-gray-900 mb-4">
          Are you sure you want to delete?
        </p>
        <div className="flex justify-end">
          <button
            onClick={handlePostDelete}
            className="bg-red-500 hover:bg-red-600 dark:text-gray-100 text-gray-900 font-bold py-2 px-4 rounded mr-2"
          >
            Delete
          </button>
          <button
            onClick={handleClose}
            className=" dark:text-gray-100 dark:hover:text-gray-300 text-gray-800 hover:text-gray-950 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCard;
