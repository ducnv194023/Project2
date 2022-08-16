import React from "react";
import { FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import avatar from "../../assets/images/empty-avatar.jpg";
import { authSelector, logout } from "../../store/reducers/authSlice";

const Navbar = ({ title }) => {
  // Selector user
  const { user } = useSelector(authSelector);

  // Dispatch
  const dispatch = useDispatch();

  // Breadcrumb
  const breadcrumb = (
    <>
      <Link to="/">Trang chủ</Link> / {title}
    </>
  );

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-breadcrumb">
          <h4 className="breadcrumb-title">{title}</h4>
          <span className="breadcrumb-link">
            {title !== "Trang chủ" ? breadcrumb : null}
          </span>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-user">
          <h3 className="navbar-name">{user.name}</h3>
          <img className="navbar-avatar" src={avatar} alt="User avatar" />
        </div>
        {user.role === "user" && (
          <Link to="/cart">
            <div className="navbar-item navbar-cart" title="Cart">
              <FaShoppingCart />
            </div>
          </Link>
        )}
        <div className="navbar-item navbar-logout" title="Logout">
          <FaSignOutAlt onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
