import React, { Fragment, useContext } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/action/auth";
import Modal from "../../layout/Modal/Modal";
import { ModalContext } from "../../context/ModalContext";

import "./Login.css";
import toast from "react-hot-toast";
import GoogleAuthButton from "../../layout/Buttons/GoogleAuthButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleAuthLoading, setGoogleAuthLoading] = useState(false)
  const {
    showLoginModal,
    toggleLoginModal,
    toggleSignupModal,
    toggleForgotPasswordModal,
  } = useContext(ModalContext);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.error("Please fill all the fields");
        setLoading(false);
        return;
      }
      dispatch(loginUser({ email, password }, setLoading, toggleLoginModal));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginClose = () => {
    toggleLoginModal();
    toggleSignupModal();
  };

  const handleForgotPassOpen = () => {
    toggleLoginModal();
    toggleForgotPasswordModal();
  };

  const handleGoogleAuth = () => {
    setGoogleAuthLoading(true)
  }

  return (
    <>
      <Modal open={showLoginModal} setOpen={toggleLoginModal}>
        <form className="form" disabled={googleAuthLoading}>
          <p id="heading">Login</p>
          <div className="field">
            <svg
              className="input-icon"
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
            </svg>
            <input
              disabled={googleAuthLoading}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="login-email"
              placeholder="name@gmail.com"
              className="input-field"
              type="text"
              required
            />
          </div>
          <div className="field">
            <svg
              className="input-icon"
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
            <input
              disabled={googleAuthLoading}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="login-password"
              placeholder="••••••••"
              className="input-field"
              required
            />
          </div>
          <div className="btn">
            <button
            disabled={googleAuthLoading || loading}
              id="submit"
              type="submit"
              onClick={handleSubmit}
              className="button1 transition duration-150 ease-in-out hover:bg-gradient-to-r hover:from-pink-600 hover:to-yellow-600 after:from-pink-700 after:to-yellow-700"
            >
              {loading ? (
                <>
                  {" "}
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-2 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Login...
                </>
              ) : (
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              )}
            </button>
            <button
            disabled={googleAuthLoading || loading}
              type="button"
              className="button2 hover:bg-gradient-to-r hover:from-pink-600 hover:to-yellow-600 after:from-pink-700 after:to-yellow-700 "
              onClick={handleLoginClose}
            >
              Sign Up
            </button>
          </div>
          <button
          disabled={googleAuthLoading || loading}
            type="button"
            onClick={handleForgotPassOpen}
            className="button3"
          >
            Forgot Password
          </button>
          <span className="flex flex-col w-full justify-center items-center mb-1" onClick={handleGoogleAuth}>
            OR
        <GoogleAuthButton googleAuthLoading={googleAuthLoading}  setGoogleAuthLoading={setGoogleAuthLoading} googleText={"Signin with Google"}/>
        </span>
        </form>
      </Modal>
    </>
  );
};

export default Login
