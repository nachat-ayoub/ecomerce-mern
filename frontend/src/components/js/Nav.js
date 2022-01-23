import React from "react";
import { Link } from "react-router-dom";

import "../css/Nav.css";

import UserProfile from "./UserProfile";

const Nav = () => {
  const userData = {
    username: "Ayoub Nachat",
    profilePicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaiYPx2DdidNuiOhGfPrgxyI2tgJGkkwHxsA&usqp=CAU",
    cartItems: 5,
  };

  return (
    <nav className="navbar-expand-lg navbar-light container-fluid d-flex justify-content-around align-items-center">
      <Link className="logo navbar-brand" to="/">
        E-commerce
      </Link>
      <ul className="navbar-nav flex-row">
        <Link className="nav-link mx-3 text-center" to="/">
          Home
        </Link>
        <Link className="nav-link mx-3 text-center" to="/signup">
          Sign up
        </Link>
        <Link className="nav-link mx-3 text-center" to="/login">
          Login
        </Link>
      </ul>
      <UserProfile userData={userData} />
    </nav>
  );
};

export default Nav;
