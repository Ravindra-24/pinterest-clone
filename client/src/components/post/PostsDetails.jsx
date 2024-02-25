import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost } from "../../redux/action/post";

const PostsDetails = ({ post, setProgress }) => {
  const user = useSelector((state) => state.authReducer.user);
  
  const dispatch = useDispatch();

  const handlePostDelete = () => {
    try {
      dispatch(deletePost(post._id, setProgress));
    } catch (error) {
      toast.error(error.message);
    }
  }; 

  return (
    <>
      {/* <div className="absolute z-10  top-0 right-0 m-2 opacity-100 hover:cursor-pointer hover:opacity-0 transition-opacity duration-300">
        <div className=" ">
        {post.user?.profilePhoto ? (
          <img
            src={post?.user?.profilePhoto}
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
            <span className="rounded-full h-8 w-8 flex items-center justify-center">
              <span className="text-white font-medium">
                {post?.user?.firstName?.charAt(0).toUpperCase() +
                  post?.user?.lastName?.charAt(0).toUpperCase()}
              </span>
            </span>
          </div>
        )}
        </div>
      </div> */}
      <div
        className="absolute bg-black bg-opacity-50  flex flex-col justify-center items-center opacity-0 hover:cursor-pointer hover:opacity-100 transition-opacity duration-300 ml-2"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "93%",
          height: "100%",
        }}
      >
        <p className="text-white text-center font-bold text-lg mb-2">
          {post.title}
        </p>
        <p className="text-white text-center font-bold text-lg mb-2">
          By,{" "}
          {post.user?.firstName?.charAt(0).toUpperCase() +
            post.user?.firstName?.slice(1)}
        </p>
        <Link
          to={`/post/${post._id}`}
          rel="noopener noreferrer"
          className="text-white text-center font-bold text-lg underline"
        >
          View
        </Link>
        {user && post.user?._id === user.id ? (
          <div className="flex mt-3">
            <Link to={`/post/edit/${post._id}`}>
              <svg
                className="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <div onClick={handlePostDelete}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 3L21 21M18 6L17.6 12M17.2498 17.2527L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6H4M16 6L15.4559 4.36754C15.1837 3.55086 14.4194 3 13.5585 3H10.4416C9.94243 3 9.47576 3.18519 9.11865 3.5M11.6133 6H20M14 14V17M10 10V17"
                  stroke="#fff"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ) : user && user.role === 1 ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 3L21 21M18 6L17.6 12M17.2498 17.2527L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6H4M16 6L15.4559 4.36754C15.1837 3.55086 14.4194 3 13.5585 3H10.4416C9.94243 3 9.47576 3.18519 9.11865 3.5M11.6133 6H20M14 14V17M10 10V17"
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default PostsDetails;
