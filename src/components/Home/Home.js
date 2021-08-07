import React from "react";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <div>
      <Link to="/products"> <img
        style={{ height: "45vh" }}
        src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,h=280/layout-engine/2021-04/HFS-masthead-web.jpg"
        alt="header-img"
      /></Link>


    </div>
  );
};
