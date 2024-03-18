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
    <Modal open={showSearchModal} setOpen={toggleSearchModal}>
      <div className="search-container flex justify-center dark:bg-slate-900 rounded-md w-[70rem] h-[37rem]">
        <div className="rounded-lg shadow-lg p-4 w-full">
          <div className="flex justify-center items-center p-5">
            <div className="relative w-[80%]">
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
    </Modal>
  );
};

export default SearchModal;
