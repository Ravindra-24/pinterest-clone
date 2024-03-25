import { Link } from "react-router-dom";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useDispatch, useSelector } from "react-redux";
import "../layout/spinner/spinner.css";
import { fetchPosts } from "../redux/action/post";
import "./Galleri.css";
import Avatar from "../layout/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faShare } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import CardSkeleton from "./CardSkeleton";
import errorImg from "../assets/imgErr1.jpg";
import SliderComponent from "./slider/ImageSlider";

const Gallery = ({ setProgress }) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const dispatch = useDispatch();

  const lastImageRef = useRef(null);
  const observer = useRef(null);
  const limit = 20;

  const allPosts = useSelector((state) => state.postsReducer.posts);

  const fetchData = () => {
    try {
      setLoading(true);
      setProgress(30);
      dispatch(fetchPosts(page, limit, setProgress, setDone, setLoading));
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

  const convertToBlob = async (url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(new Error("Failed to convert image URL to Blob"));
        }
      };
      xhr.onerror = function () {
        reject(new Error("Failed to convert image URL to Blob"));
      };
      xhr.send();
    });
  };

  const handleShare = async (e, post) => {
    e.preventDefault();
    try {
      const blob = await convertToBlob(post.image);

      const shareData = {
        files: [new File([blob], "image.jpg")],
        title: post.title,
        text: `${post?.user?.firstName} Shared a post on pin, Checkout now...`,
        url: `https://pinterest-clone-tau.vercel.app/post/${post._id}`,
      };

      if (navigator.canShare && navigator.canShare(shareData.files)) {
        await navigator
          .share(shareData)
          .then(() => toast.success("Post shared successfully"))
          .catch((error) => console.log(error));
      } else {
        await navigator
          .share({
            title: post.title,
            text: `${post?.user?.firstName} Shared a post on pin, Checkout now...`,
            url: `https://pinterest-clone-tau.vercel.app/post/${post._id}`,
          })
          .then(() => toast.success("Post shared successfully"))
          .catch((error) => console.log(error));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <SliderComponent />
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            0: 1,
            200: 2,
            750: 3,
            900: 4,
            1100: 5,
            2500: 6,
          }}
        >
          <Masonry gutter="1rem" className="mt-5">
            {allPosts &&
              allPosts.map((post, index) => (
                <Link
                  to={`/post/${post._id}`}
                  rel="noopener noreferrer"
                  className="rounded shadow-md transition-transform transform hover:scale-105"
                  key={post._id}
                >
                  <div
                    key={post._id}
                    className="relative rounded-md dark:bg-slate-900 "
                  >
                    <img
                      ref={index === allPosts.length - 1 ? lastImageRef : null}
                      className="max-h-35rem w-auto object-cover rounded-md"
                      key={post._id}
                      src={post.image}
                      alt="random"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = `${errorImg}`;
                      }}
                    />

                    <div className="hovar-card">
                      <div className="like-comment">
                        {post?.likes.length > 0 && (
                          <div className="like-Btn">
                            <span className="leftContainer">
                              <svg
                                fill="white"
                                viewBox="0 0 512 512"
                                height="1.3em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
                              </svg>
                            </span>
                            <span className="likeCount">
                              {post?.likes.length}
                            </span>
                          </div>
                        )}
                        {post?.comments.length > 0 && (
                          <div className="comment-icon">
                            <span className="comment-left">
                              <FontAwesomeIcon
                                icon={faComment}
                                className="w-[1.3em]"
                              />
                            </span>
                            <span className="comment-count">
                              {post?.comments.length}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="avatar-title">
                        <Avatar auth={post} width={6} height={6} />
                        <p>{post?.title}</p>
                      </div>
                      <div
                        className="download-icon"
                        onClick={(e) => handleShare(e, post)}
                      >
                        <FontAwesomeIcon icon={faShare} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      {loading && (
        <div className="w-full h-full">
          <CardSkeleton />
        </div>
      )}
    </>
  );
};

export default Gallery;
