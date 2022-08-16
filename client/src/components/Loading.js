import React from "react";
import loadingImg from "../assets/images/loading.png";

const Loading = () => {
  return (
    <div className="loading-bg">
      <div className="loading">
        <img className="loading-image" src={loadingImg} alt="Loading" />
      </div>
    </div>
  );
};

export default Loading;
