import React from "react";

const Modal = ({ post, setProgress, setModal, modal, children }) => {
  const handleClose = () => {
    setModal(false);
  };
  return (
    <>
      <div
        onClick={handleClose}
        className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${modal ? "visible backdrop-blur-sm" : "invisible"}
      `}
      >
        {/* modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
          bg-white rounded-xl shadow p-6 transition-all
          ${modal ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
        >
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
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
