import React, { useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";
import { useSelector } from "react-redux";
import ColorfulLoader from "../../layout/spinner/spinner";

const Profile = () => {
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
