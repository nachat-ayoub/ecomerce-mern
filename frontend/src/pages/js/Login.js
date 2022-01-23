import React from "react";

import "../css/Login.css";

const Login = () => {
  return (
    <div className="Login__container container d-flex justify-content-center align-items-center">
      <form className="Login__form">
        <h3 className="Login__h3">Login Here</h3>
        <label className="Login__label" htmlFor="username">
          Username
        </label>
        <input
          className="Login__input"
          type="text"
          placeholder="email@gmail.com"
          id="username"
        />

        <label className="Login__label" htmlFor="password">
          Password
        </label>
        <input
          className="Login__input"
          type="password"
          placeholder="Password"
          id="password"
        />

        <button className="Login__btn">Log In</button>
        <div className="Login__social">
          <div className="Login__go">
            <i className="lab la-google-plus-g"></i> Google
          </div>
          <div className="Login__fb">
            <i className="lab la-facebook-f"></i> Facebook
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
