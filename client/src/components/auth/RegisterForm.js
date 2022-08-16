import React, { useState } from "react";
import avatar from "../../assets/images/login-avatar.jpg";
import { FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authSelector, register } from "../../store/reducers/authSlice";

const RegisterForm = () => {
  const { authMsg } = useSelector(authSelector);

  // Dispath
  const dispatch = useDispatch();

  // From state
  const [formData, setFromData] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const handleRegsiter = (event) => {
    event.preventDefault();
    dispatch(register(formData));
  };

  return (
    <form className="login-form" onSubmit={handleRegsiter}>
      <img className="login-image" src={avatar} alt="Ảnh login" />
      <div className="input-group">
        <label className="input-label">Tên người dùng</label>
        <input
          className="input-text"
          type="text"
          placeholder="Tên người dùng"
          name="name"
          autoComplete="off"
          value={formData.name}
          onChange={(event) =>
            setFromData({
              ...formData,
              [event.currentTarget.name]: event.currentTarget.value,
            })
          }
        />
      </div>
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
      <button className="button login-button">Đăng ký</button>
      <div>
        Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </div>
    </form>
  );
};

export default RegisterForm;
