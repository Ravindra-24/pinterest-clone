import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";

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
