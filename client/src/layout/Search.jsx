import React, { useContext, useState } from "react";
import { SearchContext } from "../context/searchContext";
import { useLocation } from "react-router";

const Search = () => {
  const location = useLocation();
  const [text, setText] = useState("")
  const { setSearch } = useContext(SearchContext);
  return (
    <>
      {location.pathname === "/login" ||
      location.pathname === "/signup" ||
      location.pathname === "/reset-password" ||
      location.pathname === "/forgot-password" ||
      location.pathname === "/post/:id " ? (
        <></>
      ) : (
        <div className="flex w-2/3 items-center ml-1">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              style={{
                borderBottom: "1px solid #ffbf00",
              }}
              onChange={(e) => setText(e.target.value)}
              type="text"
              id="simple-search"
              className="
                rounded-md
                focus:outline-none
                bg-white-50
                text-gray-900
                text-sm
                focus:ring-blue-500
                focus:border-blue-500
                block
                w-full
                pl-10
                p-2.5
                max-sm:h-8
                bg-gray-50
                dark:bg-gray-700
                dark:text-gray-200"
              placeholder="Search post by name..."
              required=""
            />
            <button
            onClick={() => setSearch(text)}
              className="
                absolute
                right-0
                top-0
                h-full
                px-3
                py-2
                bg-blue-500
                text-white
                rounded-r-md
                hover:bg-blue-600
                focus:outline-none
              "
            >
              Search
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
