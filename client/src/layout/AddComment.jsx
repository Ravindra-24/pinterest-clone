import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { postComment } from "../redux/action/comment";
import { toast } from "react-hot-toast";

const AddComment = () => {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const auth = useSelector((state) => state.authReducer.user);
  const userId = auth?.id;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    try {
      if (!auth) return toast.error("Please login to comment");
      setIsLoading(true);
      setLoading(false);
      dispatch(
        postComment(
          id,
          { commentText, userId },
          setLoading, navigate, setIsLoading
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      setCommentText("");
    }
  };
  return (
    <>
      <div className="w-full">
        <form onSubmit={handleCommentSubmit}>
          <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
            <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-700 ">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
                id="comment"
                rows={4}
                className="w-full px-0 text-sm text-gray-900 bg-white dark:text-gray-50 border-none focus:ring-0 dark:placeholder-gray-300 dark:bg-gray-700"
                placeholder="Write a comment..."
                required
              />
            </div>
            <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
              <button
                disabled={isLoading}
                type="submit"
                className="m-2 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
              >
                {isLoading ? (
                  <>
                    {" "}
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Posting...
                  </>
                ) : (
                  "Post comment"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddComment;
