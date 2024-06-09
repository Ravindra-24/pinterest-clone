import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/action/post";
import withPrivate from "../../hoc/withPrivate";

const CreatePost = ({ setProgress }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreview = (e) => {
    const file = e.target.files[0];
    const filereader = new FileReader();
    filereader.onload = () => {
      setImagePreview(filereader.result);
      setImage(file);
    };
    filereader.readAsDataURL(file);
    // filereader
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    try {
      e.preventDefault();
      if (!title || !image)
        throw new Error("Please fill all the fields");
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("description", description);
      dispatch(createPost(formData, navigate, setProgress, scrollToTop));
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  const handleCancel = () => {
    scrollToTop();
    setImagePreview(null);
    setTitle("");
    setDescription("");
    setImage(null);
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-center align-center">
        <div className=" flex flex-1 flex-col justify-center shadow-2xl max-w-4xl rounded m-5 dark:bg-slate-900 mt-20">
          <form
            onSubmit={handleSubmit}
            className="mx-auto w-full sm:w-5/6 py-2 px-3 sm:py-5 sm:px-0 "
          >
            <h2 className="text-4xl font-extrabold my-3 max-sm:text-2xl dark:text-white">New Post</h2>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                      aria-required
                    >
                      Title
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md dark:bg-gray-600">
                        <input
                          onChange={(e) => setTitle(e.target.value)}
                          type="text"
                          name="title"
                          id="title"
                          required
                          autoComplete="title"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
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
                        onChange={(e) => setDescription(e.target.value)}
                        id="description"
                        name="description"
                        placeholder="Write a description for your post."
                        rows={3}
                        className="block w-full py-1.5 pl-1 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 dark:bg-gray-600 dark:text-white"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  {imagePreview ? (
                    <div className="col-span-full">
                      <label
                        htmlFor="cover-photo"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-white" 
                      >
                        Preview
                      </label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 dark:bg-gray-600">
                        <div className="text-center">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="col-span-full">
                      <label
                        htmlFor="photo"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                      >
                        Photo
                      </label>
                      <div className="mt-2 flex items-center gap-x-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25px"
                          height="25px"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m8 8 4-4 4 4"
                            stroke="#ffbf00"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 4v12M19 17v.6c0 1.33-1.07 2.4-2.4 2.4H7.4C6.07 20 5 18.93 5 17.6V17"
                            stroke="#ffbf00"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                          />
                        </svg>
                        <input
                          type="file"
                          name="photo"
                          id="photo"
                          accept="image/*"
                          onChange={handlePreview}
                          className="sr-only"
                        />
                        <label
                          htmlFor="photo"
                          aria-required
                          className="rounded-md text-white bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                        >
                          Upload
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
              disabled={loading}
                onClick={handleCancel}
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                className="m-2 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
                // hover:from-green-400 hover:to-blue-500
                type="submit"
                data-te-ripple-init=""
                data-te-ripple-color="light"
              >{loading ? (
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
                "Post"
              )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default withPrivate(CreatePost);
