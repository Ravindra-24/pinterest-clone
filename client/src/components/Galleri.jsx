import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ColorfulSpinner from "../layout/spinner/spinner";
import { useDispatch, useSelector } from "react-redux";
import "../layout/spinner/spinner.css";
import { fetchPosts } from "../redux/action/post";
import { SearchContext } from "../context/searchContext";
import Avatar from "../layout/Avatar";
import moment from "moment";
import ImageSlider from "./slider/ImageSlider";

const Gallery = ({ setProgress }) => {
  const [page, setPage] = useState(1);
  // const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const dispatch = useDispatch();

  const lastImageRef = useRef(null);
  const observer = useRef(null);
  const limit = 20;

  const allPosts = useSelector((state) => state.postsReducer.posts);

  const { search } = useContext(SearchContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      setDone(false);
      fetchData();
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  const fetchData = () => {
    try {
      setLoading(true);
      setProgress(30);
      dispatch(
        fetchPosts(page, limit, search, setProgress, setDone, setLoading)
      );
      setProgress(70);
      setProgress(100);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    if (loading || done) return;
    if (observer.current) {
      // if observer is already observing then disconnect it
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });
    if (lastImageRef.current) {
      observer.current.observe(lastImageRef.current);
    }
  }, [allPosts, loading]);
  
  return (
    <>
      <div>
        <ImageSlider />
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1100: 4 }}
        >
          <Masonry>
            {allPosts &&
              allPosts.map((post, index) => (
                <Link
                  to={`/post/${post._id}`}
                  rel="noopener noreferrer"
                  className="block rounded overflow-hidden shadow-md transition-transform transform hover:scale-105"
                  key={post._id}
                >
                  <div
                    key={post._id}
                    className="relative m-3 rounded-md dark:bg-gray-700 "
                  >
                    <img
                      ref={index === allPosts.length - 1 ? lastImageRef : null}
                      className="w-full h-full object-cover rounded-md"
                      key={post._id}
                      src={post.image}
                      alt="random"
                    />

                    <div className="pl-4 pr-4 p-1 font-sans">
                      <h3 className="text-sm dark:text-gray-100 font-sans">
                        {post.title}
                      </h3>
                      <p className="dark:text-gray-200 text-xs font-sans italic flex-wrap overflow-hidden">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex">
                          <Avatar auth={post} />
                          <span className="text-[0.9rem] font-serif leading-none text-white">
                            {post.user.firstName}
                            <p className="text-[0.6rem]">
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
      </div>
      {loading && (
        <div className="w-full flex justify-center m-5">
          <ColorfulSpinner />
        </div>
      )}
    </>
  );
};

export default Gallery;
