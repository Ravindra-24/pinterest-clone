import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

export const LoginButton = () => {
  const {toggleLoginModal} = useContext(ModalContext)
  return (
    <>
      <button
        className=" inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 after:from-pink-600 after:to-yellow-600"
        // hover:from-green-400 hover:to-blue-500
        type="button"
        data-te-ripple-init=""
        data-te-ripple-color="light"
        onClick={toggleLoginModal}
      >
        Login
      </button>
    </>
  );
};

export const SignupButton = () => {
  const { toggleSignupModal } = useContext(ModalContext);
  return (
    <>
      <button
        className=" inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] border-yellow-500 hover:bg-gradient-to-r from-pink-500 to-yellow-500 after:from-pink-600 after:to-yellow-600"
        type="button"
        data-te-ripple-init=""
        data-te-ripple-color="light"
        onClick={() => toggleSignupModal(true)}
      >
        Signup
      </button>
    </>
  );
};
