import React from "react";
import "./ProfileContent.css";
//components
import Addresses from "./Addresses/Addresses";
import Orders from "./Orders/Orders";
import Wishlist from "./Wishlist/Wishlist";
import Profile from "./Profile/Profile";

const ProfileContent = ({ pathName }) => {
   return (
      <div className="profileContent">
         {pathName === "address" ? (
            <Addresses />
         ) : pathName === "orders" ? (
            <Orders />
         ) : pathName === "wishlist" ? (
            <Wishlist />
         ) : (
            <Profile />
         )}
      </div>
   );
};

export default ProfileContent;
