import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DisplaySideBar = ({ children }) => {
  const location = useLocation();
  const [showSideBar, setShowSideBar] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      setShowSideBar(false);
    } else {
      setShowSideBar(true);
    }
  }, [location]);

  return <div>{showSideBar && children}</div>;
};

export default DisplaySideBar;
