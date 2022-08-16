import React from "react";
import { authSelector } from "../store/reducers/authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { Loading, LoginForm, RegisterForm } from "../components";

const LoginPage = ({ authRoute }) => {
  // Selector initialState
  const { isAuthenticated, isLoading } = useSelector(authSelector);

  const body = (
    <>
      {authRoute === "/login" && <LoginForm />}
      {authRoute === "/register" && <RegisterForm />}
    </>
  );

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div className="login-page">
      <div className="login-box">{body}</div>
      {isLoading && <Loading />}
    </div>
  );
};

export default LoginPage;
