import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const user = useSelector((state) => state.authReducer.token);

  useEffect(() => {
    if (user) {
      setShowLoginModal(false);
      setShowSignupModal(false);
      setShowForgotPasswordModal(false);
    }
  }, [user]);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const toggleSignupModal = () => {
    setShowSignupModal(!showSignupModal);
  };

  const toggleForgotPasswordModal = () => {
    setShowForgotPasswordModal(!showForgotPasswordModal);
  };


  return (
    <ModalContext.Provider
      value={{
        showLoginModal,
        showSignupModal,
        showForgotPasswordModal,
        toggleLoginModal,
        toggleSignupModal,
        toggleForgotPasswordModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
