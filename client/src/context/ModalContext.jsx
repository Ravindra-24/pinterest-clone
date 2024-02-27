import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const toggleSignupModal = () => {
    setShowSignupModal(!showSignupModal);
  };

  const toggleForgotPasswordModal = () => {
    setShowForgotPasswordModal(!showForgotPasswordModal);
  }

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
