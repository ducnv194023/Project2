import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-bg">
      <div className="not-found-page">
        <h3>
          <span>404</span>Something Wrong!
        </h3>

        <p>
          The page you've requested can't be found. Why don't you browse around?
        </p>
        <Link to="/">
          <button className="button">Take me back</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
