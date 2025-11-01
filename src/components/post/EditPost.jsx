import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getPostDetails, updatePost } from "../../redux/action/post";
import withPrivate from "../../hoc/withPrivate";

const EditPost = ({ setProgress }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const post = useSelector((state) => state.postsReducer.post);
  // console.log(post);

  const getPost = async () => {
    try {
      setIsLoading(true);
      dispatch(
        getPostDetails(
          id,
          setProgress,
          navigate
          // setTitle,
          // setDescription,
          // setImagePreview
        )
      );
      //   console.log(image);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setImagePreview(null);
    setTitle("");
    setDescription("");
    // setImage(null);
    navigate("/");
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    setTitle(post?.title);
    setDescription(post?.description);
    setImagePreview(post?.image);
  }, [post]);

  const handleSubmit = (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      if (!title || !description) throw new Error("Please fill all the fields");
      dispatch(
        updatePost(
          id,
          { title, description },
          navigate,
          setProgress,
          setIsLoading
        )
      );
      // console.log(title, description);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center align-center ">
        <div className=" flex flex-1 flex-col justify-center shadow-2xl max-w-4xl rounded m-5 dark:bg-slate-900 mt-20">
          <form
            onSubmit={handleSubmit}
            className="mx-auto w-full sm:w-5/6 py-2 px-3 sm:py-5 sm:px-0"
          >
            <h2 class="text-4xl font-extrabold my-3 max-sm:text-2xl">
              Edit Post
            </h2>

            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          onChange={(e) => setTitle(e.target.value)}
                          value={title}
                          type="text"
                          name="title"
                          id="title"
                          autoComplete="title"
                          className="block flex-1 border-[1px] rounded bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-gray-300 shadow-sm sm:text-sm sm:leading-6 dark:text-white dark:bg-gray-600"
                          placeholder="Enter a title for your post"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        id="description"
                        name="description"
                        placeholder="Write a description for your post."
                        rows={3}
                        className="block w-full py-1.5 pl-1 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-600 dark:text-white"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      Post
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 hover:cursor-not-allowed dark:bg-slate-700">
                      <div className="text-center">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full opacity-75"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                disabled={isLoading}
                onClick={handleCancel}
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                className="m-2 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
                // hover:from-green-400 hover:to-blue-500
                type="submit"
                data-te-ripple-init=""
                data-te-ripple-color="light"
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
                    Updating...
                  </>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default withPrivate(EditPost);
