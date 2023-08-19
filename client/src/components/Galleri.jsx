import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ColorfulSpinner from "../layout/spinner/spinner";
import { useDispatch, useSelector } from "react-redux";
import "../layout/spinner/spinner.css";
import { fetchPosts } from "../redux/action/post";
import PostsDetails from "./post/PostsDetails";
import { SearchContext } from "../context/searchContext";

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
      <div className="">
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4, 1100: 5 }}
        >
          <Masonry>
            {allPosts &&
              allPosts.map((post, index) => (
                <Link
                  to={`/post/${post._id}`}
                  rel="noopener noreferrer"
                  className="text-white text-center font-bold text-lg"
                >
                  <div key={post._id} className="relative ">
                    <img
                      ref={index === allPosts.length - 1 ? lastImageRef : null}
                      className="m-2"
                      key={post._id}
                      src={post.image}
                      alt="random"
                      style={{ objectFit: "contain", width: "93%" }}
                    />

                    <PostsDetails post={post} setProgress={setProgress} />
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
