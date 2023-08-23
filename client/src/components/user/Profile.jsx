import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ColorfulLoader from "../../layout/spinner/spinner";
import { getUser, userPosts } from "../../redux/action/user";
import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  useEffect(() => {
    dispatch(getUser(id));
    dispatch(userPosts(id));
  }, [dispatch, id]);
  return (
    <>
        <div className="max-w-screen-lg mx-auto ">
          <ProfileHeader />
          <ProfilePosts />
        </div>
      
    </>
  );
};

export default Profile;
