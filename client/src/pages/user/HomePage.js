import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/reducers/authSlice";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { user } = useSelector(authSelector);

  return (
    <div className="homepage">
      <h1>Xin chào, {user.name}</h1>
      <p>
        Chúc bạn có những trải nghiệm tốt nhất với hệ thống bể bơi của chúng
        tôi.
      </p>
      <div className="button-group">
        <Link to="/tickets">
          <button className="button" style={{ marginRight: "12px" }}>
            Mua vé
          </button>
        </Link>
        <Link to="/items">
          <button className="button">Mua đồ bơi</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
