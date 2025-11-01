import React from "react";
import { deletePost } from "../../redux/action/post";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Modal from "./Modal";

const DeleteCard = ({ post, open, setOpen, setLoading}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePostDelete = () => {
    try {
      dispatch(deletePost(post, setLoading));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setOpen(false);
      navigate("/");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
       <Modal setOpen={setOpen} open={open}>
     <div className=" ">
       <div className=" dark:bg-gray-800 bg-gray-50 shadow-md rounded-lg p-4 w-80 ">
        <h2 className="text-xl font-bold mb-4 dark:text-gray-100 text-gray-900 ">
          Delete Post
        </h2>
        <p className="dark:text-gray-100 text-gray-900 mb-4">
          Are you sure you want to delete?
        </p>
        <div className="flex justify-end">
          <button
            onClick={handlePostDelete}
            className="bg-red-500 hover:bg-red-600 dark:text-gray-100 text-gray-900 px-2 rounded mr-1"
          >
            Delete
          </button>
          <button
            onClick={handleClose}
            className=" dark:text-gray-100 dark:hover:text-gray-300 text-gray-800 hover:text-gray-950 py-1 px-2 rounded"
          >
            Cancel
          </button>
        </div>
     </div>
     </div>
        </Modal>
    </>
  );
};

export default DeleteCard;
