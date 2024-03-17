import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

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

  const toggleSearchModal = () => {
    setShowSearchModal(!showSearchModal);
  }

  return (
    <ModalContext.Provider
      value={{
        showLoginModal,
        showSignupModal,
        showForgotPasswordModal,
        showSearchModal,
        toggleLoginModal,
        toggleSignupModal,
        toggleForgotPasswordModal,
        toggleSearchModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
