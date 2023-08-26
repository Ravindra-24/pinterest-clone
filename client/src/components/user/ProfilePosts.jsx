import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { userPosts } from "../../redux/action/user";
import ColorfulLoader from "../../layout/spinner/spinner";


const ProfilePosts = () => {
  const userAllPosts = useSelector((state) => state.userReducer.posts);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type:"GET_USER_POSTS", payload:null})
    dispatch(userPosts(id));
  }, [dispatch, id]);

  return (
    <>
    {
      userAllPosts ? (
    
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4 mb-10">
      {userAllPosts?.map((post) => (
        <Link to={`/post/${post?._id}`} key={post?._id}>
          <div key={post?._id} className="relative">
            <img
              className="w-full h-48 object-cover"
              src={post?.image}
              alt={post?.title}
            />
            <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white"></div>
          </div>
        </Link>
      ))}
    </div>
      ):(<ColorfulLoader/>)}
      </>
  );
};

export default ProfilePosts;
