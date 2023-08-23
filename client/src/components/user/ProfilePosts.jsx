
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfilePosts = () => {
    const posts = [
      { id: 1, imageUrl: 'post1.jpg', caption: 'Caption 1' },
      { id: 2, imageUrl: 'post2.jpg', caption: 'Caption 2' },
      // Add more posts...
    ];
    const userPosts = useSelector((state) => state.userReducer.posts);
    console.log(userPosts);

  
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
        {userPosts?.map((post) => (
          <Link to={`/post/${post?._id}`} key={post?._id}>
          <div key={post?._id} className="relative">
            <img className="w-full h-48 object-cover" src={post?.image} alt={post?.title} />
            <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white">
              
            </div>
          </div>
          </Link>
        ))}
      </div>
    );
  };

  export default ProfilePosts;