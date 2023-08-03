import { Route, Routes } from "react-router";
import React, { useState } from "react";
import Gallery from "./components/Galleri";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import PostView from "./components/PostView";
import LoadingBar from "react-top-loading-bar";

const AllRoutes = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Navbar />
      <LoadingBar
        color="#6096f8"
        height={4}
        shadow={true}
        progress={progress}
        loaderSpeed={500}
        containerStyle={{ zIndex: 1000 }}
        transitionTime={500}
        waitingTime={1000}
        onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
        <Route path="/" element={<Gallery setProgress={setProgress} />} />
        <Route
          path="/post/:id"
          element={<PostView setProgress={setProgress} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default AllRoutes;
