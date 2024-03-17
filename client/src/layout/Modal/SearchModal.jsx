import React, { useContext, useState } from 'react';
import Modal from './Modal';
import { ModalContext } from '../../context/ModalContext';
import { SearchContext } from '../../context/searchContext';

const SearchModal = () => {
    const [text, setText] = useState('');
    const { showSearchModal, toggleSearchModal } = useContext(ModalContext);
    const {setSearch} = useContext(SearchContext)

    const searchResults = [
        { id: 1, image: 'https://res.cloudinary.com/dbjq9ekgu/image/upload/v1698510739/posts/to06zpayczuomh6hagle.jpg' },
        { id: 2, image: 'https://res.cloudinary.com/dbjq9ekgu/image/upload/v1698510739/posts/to06zpayczuomh6hagle.jpg' },
        { id: 3, image: 'https://res.cloudinary.com/dbjq9ekgu/image/upload/v1698510739/posts/to06zpayczuomh6hagle.jpg' },
    ];

    const renderSearchResults = () => {
        return searchResults.map((result) => (
            <img
                key={result.id}
                src={result.image}
                alt="Search Result"
                className="w-32 h-32 object-cover rounded-lg"
            />
        ));
    };

    return (
        <Modal open={showSearchModal} setOpen={toggleSearchModal}>
            <div className="flex items-center justify-center dark:bg-slate-900 rounded-md">
                <div className=" rounded-lg shadow-lg p-4">
                <div className="flex items-center p-5">
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
                text-white
                rounded-r-md
                bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600
                focus:outline-none
              "
            >
              Search
            </button>
          </div>
        </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        Comming Soon...
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default SearchModal;