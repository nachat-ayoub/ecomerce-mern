import React from "react";

import "../css/UserProfile.css";

const UserProfile = ({ userData }) => {
  return (
    <div className="d-flex justify-content-between align-items-center userProfile">
      <div className="cart">
        <div className="icon">
          <i className="las la-shopping-cart"></i>
        </div>
        <div className="counter">{userData.cartItems}</div>
      </div>
      <div className="profile">
        <div className="avatar my-2">
          <img src={userData.profilePicture} alt="Profile" />
        </div>
        <h6 className="usernam">{userData.username}</h6>
      </div>
    </div>
  );
};

export default UserProfile;
