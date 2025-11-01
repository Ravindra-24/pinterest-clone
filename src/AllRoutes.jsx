import { Route, Routes } from "react-router";
import React, { useEffect, useState } from "react";
import Gallery from "./components/Galleri";
import Footer from "./layout/Footer/Footer";
import PostView from "./components/post/PostView";
import LoadingBar from "react-top-loading-bar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import { Toaster } from "react-hot-toast";
import NotFound from "./layout/NotFound";
import { useLocation } from "react-router";
import "./App.css";
import CreatePost from "./components/post/CreatePost";
import EditPost from "./components/post/EditPost";
import Profile from "./components/user/Profile";
import EditProfile from "./components/user/EditProfile";
import About from "./layout/About";
import { useSelector } from "react-redux";
import SpinnerComponent from "./layout/spinner/spinner";
import Navbar from "./layout/Navbar/Navbar";
import SearchModal from "./layout/Modal/SearchModal/SearchModal";
import BackToTop from "./layout/BackToTOP";

const AllRoutes = () => {
  const location = useLocation();

  const loaded = useSelector((state) => state.authReducer.loaded);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(40);
    const timeout = setTimeout(() => {
      setProgress(100);
    });
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div>
      <Toaster />
      <Navbar />
      <BackToTop />
      <SearchModal />
      <Login />
      <Signup />
      <ForgotPassword />
      <div className="gradient-progress-wrapper">
        <LoadingBar
          // className="loading-bar"
          color="#FF6000"
          height={3}
          shadow={true}
          progress={progress}
          loaderSpeed={400}
          containerStyle={{ zIndex: 1000 }}
          transitionTime={200}
          // waitingTime={500}
          onLoaderFinished={() => setProgress(0)}
        />
      </div>
      {loaded ? (
        <>
          {" "}
          <Routes>
            <Route path="/" element={<Gallery setProgress={setProgress} />} />
            <Route
              path="/post/:id"
              element={<PostView setProgress={setProgress} />}
            />
            <Route
              path="/post/edit/:id"
              element={<EditPost setProgress={setProgress} />}
            />
            <Route
              path="/reset-password/:token"
              element={<ResetPassword setProgress={setProgress} />}
            />
            <Route
              path="/create-post"
              element={<CreatePost setProgress={setProgress} />}
            />

            <Route path="/user/:id" element={<Profile />} />
            <Route
              path="/user/edit/:id"
              element={<EditProfile setProgress={setProgress} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />{" "}
        </>
      ) : (
        <div className="w-screen h-screen flex justify-center align-middle">
          <SpinnerComponent />
        </div>
      )}
    </div>
  );
};

export default AllRoutes;
