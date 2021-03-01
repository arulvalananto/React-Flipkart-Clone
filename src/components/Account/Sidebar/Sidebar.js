import { Avatar } from "@material-ui/core";
import { Person, Straighten } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useStateValue } from "../../../contextAPI/StateProvider";
import { db } from "../../../firebase";
import "./Sidebar.css";

const Sidebar = () => {
   let { url } = useRouteMatch();

   const [{ user, username }] = useStateValue();
   const [userName, setUserName] = useState("");

   useEffect(() => {
      db.collection("users")
         .doc(user?.email)
         .get()
         .then((doc) => setUserName(doc.data()?.displayName))
   }, [username]);

   return (
      <div className="sidebar">
         <div className="sidebar__info">
            <Avatar
               className="sidebar__pic"
               src="//img1a.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-male_4811a1.svg"
            />
            <div className="sidebar__details">
               <p className="sidebar__invitation">Hello,</p>
               <h4 className="sidebar__username">{userName}</h4>
            </div>
         </div>
         <div className="sidebar__navigations">
            <div className="sidebar__navigationSection">
               <div className="sidebar__navigationTitleContainer">
                  <Person className="sidebar__navigationTitleIcon" />
                  <h3 className="sidebar__navigationTitle">{`${"account settings".toUpperCase()}`}</h3>
               </div>
               <div className="sidebar__navigation">
                  <Link to="/account">
                     <p
                        className={`sidebar__navigationItem ${
                           url === "/account" && "active"
                        }`}
                     >
                        Profile Information
                     </p>
                  </Link>
                  <Link to="/account/address">
                     <p
                        className={`sidebar__navigationItem ${
                           url === "/account/address" && "active"
                        }`}
                     >
                        Manage Addresses
                     </p>
                  </Link>
               </div>
            </div>
            <div className="sidebar__navigationSection">
               <div className="sidebar__navigationTitleContainer">
                  <Straighten className="sidebar__navigationTitleIcon" />
                  <h3 className="sidebar__navigationTitle">{`${"my stuff".toUpperCase()}`}</h3>
               </div>
               <div className="sidebar__navigation">
                  <Link to="/account/orders">
                     <p
                        className={`sidebar__navigationItem ${
                           url === "/account/orders" && "active"
                        }`}
                     >
                        My Orders
                     </p>
                  </Link>
                  <Link to="/account/wishlist">
                     <p
                        className={`sidebar__navigationItem ${
                           url === "/account/wishlist" && "active"
                        }`}
                     >
                        My Wishlist
                     </p>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Sidebar;
