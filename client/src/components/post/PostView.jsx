import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { deletePost, getPostDetails } from "../../redux/action/post";
import ColorfulLoader from "../../layout/spinner/spinner";

const PostView = ({ setProgress }) => {
  const post = useSelector((state) => state.postsReducer.post);
  console.log(post);

  const [liked, setLiked] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleLike = () => {
    setLiked(!liked);
  };

  const getpostDetail = () => {
    try {
      dispatch(getPostDetails(id, setProgress, navigate));
    } catch (error) {
      toast.error(error.message);
    } 
  };

  const handlePostDelete = () => {
    try {
      dispatch(deletePost(post._id, setProgress));
    } catch (error) {
      toast.error(error.message);
    }finally{
      navigate('/')
    }
  }

  useEffect(() => {
    getpostDetail();
  }, []);

  return (
    <>
      {post ? (
        <div className="flex justify-center align-center">
          <div className=" flex flex-1 flex-col justify-center shadow-2xl max-w-5xl rounded m-5 max-sm:m-auto">
            <div className="max-w-full mx-auto bg-white rounded-md shadow-md overflow-hidden w-full">
              <div className="md:flex gap-4 w-full">
                <div className="md:w-2/3 flex place-items-start justify-center align-top">
                  <img
                    src={post?.image}
                    alt="Post"
                    className="w-full h-auto object-cover md:object-none align-top"
                    style={{
                      objectFit: "contain",
                      maxHeight: "550px",
                      padding: "15px",
                    }}
                  />
                </div>
                <div className="md:w-1/2 p-4 flex flex-col justify-center">
                  <div className="flex items-center">
                    {post.user.photo ? (
                      <img
                        src={post?.user.photo}
                        alt="Profile"
                        className="w-10 h-10 rounded-full mr-2 object-cover"
                      />
                    ) : (
                      <div
                        className="max-w-xs bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 rounded-full flex items-center text-sm focus:outline-none focus:shadow-solid mr-2"
                        id="user-menu"
                        aria-label="User menu"
                        aria-haspopup="true"
                      >
                        {/* <span className="sr-only">Open user menu</span> */}
                        <span className="rounded-full h-8 w-8 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {post?.user?.firstName?.charAt(0).toUpperCase()+post?.user?.lastName?.charAt(0).toUpperCase() }
                          </span>
                        </span>
                      </div>
                    )}
                    <div>
                      <h2 className="text-lg font-semibold">
                        {post.user.firstName + " " + post.user.lastName}
                      </h2>
                      <p className="text-gray-600 text-sm">{post?.user?.location || <>location</>}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {post?.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{post?.description}</p>
                  </div>
                  <div className="flex items-center mb-4">
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
                      <p className="text-gray-600 text-sm">
                        {liked ? "Liked" : "Like"}
                      </p>
                    </button>
                    <button
                      className="flex items-center focus:outline-none"
                      onClick={handlePostDelete}
                    >delete
                    </button>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Comments</h3>
                    <Comments
                      comment={{
                        author: "John Doe",
                        content:
                          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                      }}
                    />
                    <Comments
                      comment={{
                        author: "Jane Doe",
                        content:
                          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      }}
                    />
                    <Comments
                      comment={{
                        author: "Jane Doe",
                        content:
                          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      }}
                    />
                    <Comments
                      comment={{
                        author: "Jane Doe",
                        content:
                          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      }}
                    />
                    <Comments
                      comment={{
                        author: "Jane Doe",
                        content:
                          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <ColorfulLoader />
        </div>
      )}
    </>
  );
};

export default PostView;
