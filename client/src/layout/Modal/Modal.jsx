import React from "react";

const Modal = ({ open, setOpen, children }) => {
  // const handleClose = () => {
  //   setOpen(false);
  // };
  return (
    <>
      <div
        onClick={setOpen}
        className={`
        fixed inset-0 flex justify-center items-center transition-colors z-[1000]
        ${open ? "visible backdrop-blur-sm" : "invisible"}
      `}
      >
        {/* open */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
          bg-gradient-to-r from-pink-500 to-yellow-500 rounded-xl shadow p-1 transition-all duration-200
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
        >
          <button
            onClick={setOpen}
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
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
