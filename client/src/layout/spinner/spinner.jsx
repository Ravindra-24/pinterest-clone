import React from "react";
import "./spinner.css"; // Import the CSS file here

const SpinnerComponent = () => {
  return (
    <div className="body">
    <div class="spinner-container">
      <div class="spinner"></div>
      {/* <span>Loading...</span> */}
    </div>
    </div>
  );
};

export default SpinnerComponent;
