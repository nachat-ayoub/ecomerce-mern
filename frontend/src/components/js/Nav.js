import { signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConfig";

import "../css/Nav.css";

import UserProfile from "./UserProfile";

const Nav = ({ user }) => {
  const userData = {
    username: user?.displayName || "anonymous",
    profilePicture:
      user?.photoURL ||
      "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",
    cartItems: 0,
  };

  return (
    <>
      {user ? (
        <nav className="navbar-expand-lg navbar-light container-fluid d-flex justify-content-around align-items-center">
          <Link className="logo navbar-brand" to="/">
            E-commerce
          </Link>
          <ul className="navbar-nav d-flex flex-row justify-content-end">
            <Link className="nav-link mx-3 text-center" to="/">
              Home
            </Link>
          </ul>
          <button
            className="fw-bold btn btn-outline-warning mx-3 text-center"
            onClick={() => signOut(auth)}
          >
            Logout
          </button>
          <UserProfile userData={userData} />
        </nav>
      ) : (
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
        </nav>
      )}
    </>
  );
};

export default Nav;
