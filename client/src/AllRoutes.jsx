import { Route, Routes } from "react-router";
import React, { useEffect, useState } from "react";
import Gallery from "./components/Galleri";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import PostView from "./components/post/PostView";
import LoadingBar from "react-top-loading-bar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import toast, { Toaster } from "react-hot-toast";
import NotFound from "./layout/NotFound";
import { useLocation } from "react-router";
import "./App.css";
import CreatePost from "./components/post/CreatePost";
import EditPost from "./components/post/EditPost";
import { SearchProvider } from "./context/searchContext";

const AllRoutes = () => {
  const location = useLocation();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    try {
      setProgress(50);
    } catch (error) {
      setProgress(100);
      toast.error(error.message);
    } finally {
      setProgress(100);
    }
  }, [location.pathname]);

  return (
    <div>
      <Toaster />
      <SearchProvider>
      <Navbar setProgress={setProgress} />
      <div className="gradient-progress-wrapper">
        <LoadingBar
          // className="loading-bar"
          color="#6096f8"
          height={4}
          shadow={true}
          progress={progress}
          loaderSpeed={500}
          containerStyle={{ zIndex: 1000 }}
          transitionTime={500}
          waitingTime={500}
          onLoaderFinished={() => setProgress(0)}
        />
      </div>
      <Routes>
        <Route path="/" element={<Gallery setProgress={setProgress} />} />
        <Route
          path="/post/:id"
          element={<PostView setProgress={setProgress} />}
        />
        <Route path="/post/edit/:id" element={<EditPost setProgress={setProgress}/>}/>
        <Route path="/login" element={<Login setProgress={setProgress} />} />
        <Route path="/signup" element={<Signup setProgress={setProgress} />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword setProgress={setProgress} />}
        />
        <Route
          path="/reset-password/:token"
          element={<ResetPassword setProgress={setProgress} />}
        />
        <Route path="/create-post" element={<CreatePost setProgress={setProgress}/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </SearchProvider>
      <Footer />
    </div>
  );
};

export default AllRoutes;
