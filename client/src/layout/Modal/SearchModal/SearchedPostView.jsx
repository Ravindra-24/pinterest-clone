import React, { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import Avatar from "../../Avatar";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import SpinnerComponent from "../../spinner/spinner";
import { SearchContext } from "../../../context/searchContext";

const SearchedPostView = ({ loading }) => {
  const { search, toggleSearchModal } = useContext(SearchContext);
  const posts = useSelector((state) => state.searchReducer);
  return (
    <>
      {loading ? (
        <div className="w-full h-[calc(100vh-200px)] flex justify-center items-center">
          <SpinnerComponent />
        </div>
      ) : (
        <div className="overflow-auto relative h-[calc(100vh-200px)] p-2 w-full">
          {search.length >= 1 && posts.searchedPosts.length < 1 && posts.loaded ? (
            <>
              <p> Nothing to show </p>
            </>
          ) : (
            <>
              {posts.searchedPosts && (
                <>
                  <ResponsiveMasonry
                    columnsCountBreakPoints={{
                      350: 1,
                      450: 2,
                      750: 2,
                      900: 3,
                      1100: 4,
                    }}
                  >
                    <Masonry>
                      {posts.searchedPosts.map((post) => (
                        <Link
                          to={`/post/${post._id}`}
                          onClick={() => toggleSearchModal()}
                          rel="noopener noreferrer"
                          className="block rounded overflow-hidden shadow-md transition-transform transform hover:scale-105"
                          key={post._id}
                        >
                          <div
                            key={post._id}
                            className="relative m-3 rounded-md dark:bg-slate-900 "
                          >
                            <img
                              className="w-full h-full object-cover rounded-md"
                              key={post._id}
                              src={post.image}
                              alt="random"
                              loading="lazy"
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src =
                                  "../../public/assets/imgErr1.jpg";
                              }}
                            />

                            <div className="pl-4 pr-4 p-1 ">
                              <h3 className="text-sm dark:text-gray-100">
                                {post.title}
                              </h3>
                              <p className="dark:text-gray-200 text-xs italic flex-wrap overflow-hidden">
                                {post.description}
                              </p>
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex">
                                  <Avatar auth={post} height={6} width={6} />
                                  <span className="text-[0.9rem] leading-none text-gray-900 dark:text-gray-100">
                                    {post.user.firstName}
                                    <p className="text-[0.6rem] text-gray-900 dark:text-gray-100">
                                      {post.user?.followers?.length} Followers
                                    </p>
                                  </span>
                                </div>
                                <div>
                                  <span className="dark:text-gray-100 text-xs text-gray-900">
                                    {moment(post.createdAt).fromNow()}
                                  </span>
                                </div>
                              </div>
                              {post?.likes.length > 0 && (
                                <p className="text-[0.7rem] pt-2 italic">
                                  Liked By {post.likes?.length} People
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </Masonry>
                  </ResponsiveMasonry>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SearchedPostView;
