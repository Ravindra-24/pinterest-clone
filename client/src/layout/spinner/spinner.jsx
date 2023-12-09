import React from "react";
import "./spinner.css"; // Import the CSS file here

const SpinnerComponent = () => {
  return (
    <div className="body ">
    <div className="spinner-container flex justify-center" style={{alignItems:'center'}}>
      <div className="spinner"></div>
      {/* <span>Loading...</span> */}
    </div>
    </div>
  );
};

export default SpinnerComponent;
