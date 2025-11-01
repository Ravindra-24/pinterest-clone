import React, { useContext, useEffect, useState } from "react";
import Modal from "../Modal";
import "./SearchModal.css";
import { SearchContext } from "../../../context/searchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { searchPosts } from "../../../redux/action/post";
import SearchedPostView from "./SearchedPostView";

const SearchModal = () => {
  const [loading, setLoading] = useState(false);
  const { showSearchModal, toggleSearchModal } = useContext(SearchContext);
  const { search, setSearch } = useContext(SearchContext);
  const dispatch = useDispatch();

  const fetchData = () => {
    try {
      if (search.length < 1) return;
      setLoading(true);
      dispatch(searchPosts(search, setLoading));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData();
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div
        onClick={toggleSearchModal}
        className={`
        fixed inset-0 flex justify-center w-screen transition-colors z-[1000]
        ${showSearchModal ? "visible backdrop-blur-sm" : "invisible"}
      `}
      >
        {/* open */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
          bg-gradient-to-r from-pink-500 to-yellow-500 w-11/12 max-sm:w-full max-sm:p-0 h-max rounded-xl shadow p-1 mt-10 transition-all duration-200
          ${showSearchModal ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
        >
          <button
            onClick={toggleSearchModal}
            className="absolute top-2 right-2 p-1 rounded-lg dark:text-gray-300 dark:bg-gray-800 dark:hover:text-gray-50 text-gray-700 bg-gray-100 hover:text-gray-900"
          >
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
      <div className="search-container flex justify-center w-full dark:bg-slate-900 rounded-md">
        <div className="rounded-lg shadow-lg p-4 w-full">
          <div className="flex justify-center items-center p-5 ">
            <div className="relative w-3/4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-gray-600 dark:text-gray-200"
                />
              </div>
              <input
                style={{
                  borderBottom: "1px solid #ffbf00",
                }}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                id="simple-search"
                className="
                rounded-md
                focus:outline-none
                bg-white-50
                text-gray-950
                text-sm
                focus:ring-blue-500
                focus:border-blue-500
                block
                w-full
                pl-10
                p-2.5
                max-sm:h-8
                bg-gray-50
                dark:bg-gray-600
                dark:text-gray-200"
                placeholder="Search post by name..."
                required
              />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <SearchedPostView loading={loading}/>
          </div>
        </div>
      </div>
      </div>
      </div>
  );
};

export default SearchModal;
