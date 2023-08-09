import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ColorfulSpinner from "../layout/spinner/spinner";
import '../layout/spinner/spinner.css'

const Gallery = ({ setProgress }) => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const lastImageRef = useRef(null);
  const observer = useRef(null);
  const limit = 20;
  const fetchData = async () => {
    try {
      setLoading(true);
      setProgress(30);
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`
      );
      setProgress(70);
      setPosts((prev) => [...prev, ...data]);
      setProgress(100);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    if (loading) return;
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
  }, [posts, loading]);

  return (
    <>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4, 1100: 5 }}
      >
        <Masonry>
          {posts.map(({ url, id }, index) => (
            <img
              ref={index === posts.length - 1 ? lastImageRef : null}
              className="m-2"
              key={id}
              src={url}
              alt="random"
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {loading && (<ColorfulSpinner/>
        // <div className="w-full flex justify-center">
        // <div
        //   class="inline-block border-[#BF00F1] h-8 w-8 animate-spin rounded-full border-4 border-solid border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        //   role="status"
        // >
        //   <span class="fill-orange-500 !absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        //     Loading...
        //   </span>
        // </div>
        // </div>
      )}
    </>
  );
};

export default Gallery;
