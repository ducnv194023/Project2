import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { adminRoutes, authRoutes, userRoutes } from "./routes/routes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, getUser } from "./store/reducers/authSlice";
import { DefaultLayout } from "./layouts";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { user } = useSelector(authSelector);

  return (
    <Router>
      <Routes>
        {authRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={<Page authRoute={route.path} />}></Route>
          );
        })}
        <Route element={<ProtectedRoute />}>
          {user &&
            user.role === "admin" &&
            adminRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <DefaultLayout route={route}>
                      <Page />
                    </DefaultLayout>
                  }
                />
              );
            })}
          {userRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <DefaultLayout route={route}>
                    <Page />
                  </DefaultLayout>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
