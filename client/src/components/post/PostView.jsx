import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router";
import { deletePost, getPostDetails } from "../../redux/action/post";
import ColorfulLoader from "../../layout/spinner/spinner";
import AddComment from "../../layout/AddComment";
import PostLikes from "./PostLikes";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEdit, faShareNodes, faTrash } from '@fortawesome/free-solid-svg-icons'

const PostView = ({ setProgress }) => {
  const auth = useSelector((state) => state.authReducer.user);
  const post = useSelector((state) => state.postsReducer.post);

  const [liked, setLiked] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const handleLike = () => {
    setLiked(!liked);
  };

  const getpostDetail = () => {
    try {
      dispatch(getPostDetails(id, setProgress, navigate));
    } catch (error) {
      toast.error(error.message);
      navigate('/')
    }
  };

  const handlePostDelete = () => {
    try {
      dispatch(deletePost(post._id, setProgress));
    } catch (error) {
      toast.error(error.message);
    } finally {
      navigate("/");
    }
  };

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(
        "https://pinterest-clone-38i4lr1sq-ravindra-24.vercel.app" + location.pathname
      );
      toast.success("Link Copied");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getpostDetail();
  }, []);

  return (
    <>
      {post ? (
        <div className="flex justify-center align-center bg-gray-50 dark:bg-gray-900">
          <div className=" flex flex-1 flex-col justify-center shadow-2xl max-w-5xl rounded m-5 max-sm:m-auto">
            <div className="max-w-full mx-auto bg-gray-50 dark:bg-gray-800 dark:test-white rounded-md shadow-md overflow-hidden w-full">
              <div className="md:flex gap-4 w-full ">
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
                <div className="md:w-1/2 p-4 flex flex-col justify-center bg-gray-50 dark:bg-gray-800 dark:test-white text-gray-900">
                  <div className="flex items-center">
                    {post.user?.profilePicture ? (
                      <img
                        src={post?.user?.profilePicture}
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
                            {post?.user?.firstName?.charAt(0).toUpperCase() +
                              post?.user?.lastName?.charAt(0).toUpperCase()}
                          </span>
                        </span>
                      </div>
                    )}
                    <div className="bg-gray-50 dark:bg-gray-800 dark:test-white text-gray-900 cursor-pointer " onClick={()=>navigate(`/user/${post?.user?._id}`)}>
                      <h2 className="text-lg font-semibold dark:text-white ">
                        {post?.user?.firstName.charAt(0).toUpperCase() +
                          post?.user?.firstName.slice(1) +
                          " " +
                          post?.user?.lastName.charAt(0).toUpperCase() +
                          post?.user?.lastName.slice(1)}
                      </h2>
                      <p className="text-gray-600 text-sm dark:text-gray-200">
                        Posted {moment(post?.createdAt).fromNow()}{" "}
                        
                      </p>
                    </div>
                  </div>
                  <div className="m-4">
                    <h3 className="text-lg font-semibold mb-2 dark:text-white">
                      {post?.title}
                    </h3>
                    <p className="text-gray-600 text-sm overflow-hidden whitespace-normal break-all dark:text-white">
                      {post?.description}
                    </p>
                  </div>
                  <div className="flex items-center mb-4">
                    <PostLikes post={post}/>
                    <button
                      className="flex items-center focus:outline-none ml-4"
                      onClick={handleShare}
                    >
                      <p className="text-gray-600 text-sm dark:text-gray-200"><FontAwesomeIcon icon={faShareNodes} />  Share</p>
                    </button>
                    {auth && auth.id === post.user._id && (
                      <>
                      <button
                        className="flex items-center focus:outline-none ml-4"
                        onClick={handlePostDelete}
                      >
                        <p className="text-gray-600 text-sm dark:text-gray-200"><FontAwesomeIcon icon={faTrash} />   delete</p>
                      </button>
                      <button
                      className="flex items-center focus:outline-none ml-4"
                      onClick={()=>navigate(`/post/edit/${post._id}`)}
                    >
                      <p className="text-gray-600 text-sm dark:text-gray-200"><FontAwesomeIcon icon={faEdit} />   edit</p>
                    </button>
                    </>
                    )}
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold mb-2 dark:text-white">Comments</h3>
                      <span className=" italic dark:text-gray-200">
                        {post?.comments?.length > 0
                          ? post?.comments?.length + " comments"
                          : ""}
                      </span>
                    </div>

                    <div className="flex items-center mb-4 w-full">
                      <AddComment />
                    </div>
                    <div className="max-sm:w-full">
                      <Comments comments={post?.comments} postId={post?._id} />
                    </div>
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
