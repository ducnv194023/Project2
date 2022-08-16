import React, { useState } from "react";
import avatar from "../../assets/images/login-avatar.jpg";
import { FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authSelector, login } from "../../store/reducers/authSlice";

const LoginForm = () => {
  const { authMsg } = useSelector(authSelector);

  // Dispath
  const dispatch = useDispatch();

  // From state
  const [formData, setFromData] = useState({
    phone: "",
    password: "",
  });

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(formData));
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <img className="login-image" src={avatar} alt="Ảnh login" />
      <div className="input-group">
        <label className="input-label">Số điện thoại</label>
        <input
          className="input-text"
          type="text"
          placeholder="Số điện thoại"
          name="phone"
          autoComplete="off"
          value={formData.phone}
          onChange={(event) =>
            setFromData({
              ...formData,
              [event.currentTarget.name]: event.currentTarget.value,
            })
          }
        />
      </div>
      <div className="input-group">
        <label className="input-label">Mật khẩu</label>
        <input
          className="input-text"
          type="password"
          name="password"
          placeholder="Mật khẩu"
          autoComplete="off"
          value={formData.password}
          onChange={(event) =>
            setFromData({
              ...formData,
              [event.currentTarget.name]: event.currentTarget.value,
            })
          }
        />
      </div>
      {authMsg && (
        <div className="login-error">
          <FaExclamationTriangle className="error-icon" /> {authMsg}
        </div>
      )}
      <button className="button login-button">Đăng nhập</button>
      <div>
        Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
      </div>
    </form>
  );
};

export default LoginForm;
