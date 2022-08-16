import React from "react";
import { Content, Menu, Navbar } from "./components";

const DefaultLayout = ({ children, route }) => {
  return (
    <div className="App">
      <Menu title={route.title} />
      <div className="main-content">
        <Navbar title={route.title} />
        <Content>{children}</Content>
      </div>
    </div>
  );
};

export default DefaultLayout;
