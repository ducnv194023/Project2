import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { authSelector } from "../store/reducers/authSlice";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector(authSelector);

  return isAuthenticated ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
