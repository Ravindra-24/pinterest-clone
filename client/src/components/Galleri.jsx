import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ColorfulSpinner from "../layout/spinner/spinner";
import { useDispatch, useSelector } from "react-redux";
import "../layout/spinner/spinner.css";
import { fetchPosts } from "../redux/action/post";
import PostsDetails from "./post/PostsDetails";
import { SearchContext } from "../context/searchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../layout/Avatar";


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
      <div className="m-2">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1100: 4 }}>
          <Masonry>
            {allPosts &&
              allPosts.map((post, index) => (
                <Link
                  to={`/post/${post._id}`}
                  rel="noopener noreferrer"
                  className="block  rounded overflow-hidden shadow-md transition-transform transform hover:scale-105"
                  key={post._id}
                >
                  <div key={post._id} className="relative m-3 rounded-md dark:bg-gray-700 ">
                    <img
                      ref={index === allPosts.length - 1 ? lastImageRef : null}
                      className="w-full h-64 object-cover"
                      key={post._id}
                      src={post.image}
                      alt="random"
                    />

                    <div className="p-4">
                    <h3 className="text-lg font-bold dark:text-gray-100 font-sans">{post.title}</h3>
                      <p className="dark:text-gray-200 text-xs font-sans italic flex-wrap overflow-hidden">{post.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex">
                        <Avatar auth={post.user} />
                        <span className="text-md font-semibold text-white">{post.user.firstName}</span>
                        </div>
                        <div className="flex text-2xl">
                        <span>{post?.likes.length}{" "}<FontAwesomeIcon icon={faHeart} className="mr-2 text-red-500 w-6 h-6" /></span>
                        <span>{post?.comments.length}{" "}<FontAwesomeIcon icon={faComment} className="mr-2 text-blue-500 w-6 h-6" /></span>
                        
                        </div>
                      </div>
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
