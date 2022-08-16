import React, { useState } from "react";
import {
  FaStream,
  FaHome,
  FaCartPlus,
  FaSwimmer,
  FaChartBar,
  FaTicketAlt,
} from "react-icons/fa";
import { GiUnderwearShorts } from 'react-icons/gi'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authSelector } from "../../store/reducers/authSlice";

const Menu = ({ title }) => {
  const [hidden, setHidden] = useState(false);
  const { user } = useSelector(authSelector);

  const menuItem =
    user.role === "admin"
      ? [
          {
            path: "/",
            title: "Trang chủ",
            icon: <FaHome />,
          },
          {
            path: "/admin/tickets",
            title: "Bán vé",
            icon: <FaCartPlus />,
          },
          {
            path: "/admin/items",
            title: "Đồ bơi",
            icon: <FaSwimmer />,
          },
          {
            path: "/admin/finance-managements",
            title: "Quản lý thu chi",
            icon: <FaChartBar />,
          },
        ]
      : [
          {
            path: "/",
            title: "Trang chủ",
            icon: <FaHome />,
          },
          {
            path: "/tickets",
            title: "Mua vé",
            icon: <FaCartPlus />,
          },
          {
            path: "/items",
            title: "Mua đồ bơi",
            icon: <FaSwimmer />,
          },
          {
            path: "/me/tickets",
            title: "Vé bơi",
            icon: <FaTicketAlt />,
          },
          {
            path: "/me/wears",
            title: "Đồ bơi",
            icon: <GiUnderwearShorts />,
          },
        ];

  const toggleMenu = () => {
    setHidden(!hidden);
  };

  return (
    <div className={hidden ? "menu hidden" : "menu"}>
      {/* Menu header */}
      <div className="menu-header">
        <h2 className="menu-title">
          <FaStream className="menu-title-icon" onClick={toggleMenu} />
          {hidden ? null : (
            <>
              <Link to="/" className="menu-title-content">
                Quản lý bể bơi
              </Link>
            </>
          )}
        </h2>
      </div>
      {/* Menu items */}
      <div className="menu-items">
        {menuItem.map((item, index) => {
          return (
            <Link to={item.path} key={index}>
              <div
                className={
                  title === item.title ? "menu-item active" : "menu-item"
                }
              >
                <div className="menu-item-icon">{item.icon}</div>
                {hidden ? null : (
                  <>
                    <div className="menu-item-title">{item.title}</div>
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
