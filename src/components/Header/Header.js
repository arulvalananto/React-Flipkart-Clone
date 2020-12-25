import React, { useEffect, useState } from "react";
import "./Header.css";
import {
   AccountCircle,
   ExitToApp,
   ExpandLess,
   ExpandMore,
   Favorite,
   Search,
   ShoppingCart,
   Store,
} from "@material-ui/icons";
import { Menu, MenuItem } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../contextAPI/StateProvider";
import { actionTypes } from "../../contextAPI/reducer";
import { auth, db } from "../../firebase";

const Header = () => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [{ user }, dispatch] = useStateValue();
   const history = useHistory();
   const [userName, setUserName] = useState("");

   useEffect(() => {
      db.collection("users")
         .doc(user?.email)
         .get()
         .then((doc) => setUserName(doc.data()?.displayName));
   }, [user]);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const toggleLogin = () => {
      dispatch({ type: actionTypes.TOGGLE_LOGIN, condition: true });
   };

   return (
      <div className="header">
         <div className="header__left">
            <div className="header__logoBox">
               <Link to="/">
                  <img
                     src="//img1a.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png"
                     alt="Flipkart Logo"
                     className="header__logo"
                  />
               </Link>
               <Link to="/" className="header__explore">
                  Explore{" "}
                  <span>
                     Plus
                     <img
                        src="//img1a.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png"
                        alt="Explore Plus Logo"
                        className="header__exploreLogo"
                     />
                  </span>
               </Link>
            </div>
            <div className="header__searchBox">
               <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  className="header__searchInput"
               />
               <button className="header__searchButton">
                  <Search />
               </button>
            </div>
         </div>
         <div className="header__right">
            {user ? (
               <div>
                  <p
                     className="header__userMenu"
                     aria-controls="simple-menu"
                     aria-haspopup="true"
                     onClick={handleClick}
                  >
                     {userName || user?.displayName?.toUpperCase()}
                     {anchorEl ? <ExpandLess /> : <ExpandMore />}
                  </p>
                  <Menu
                     id="simple-menu"
                     anchorEl={anchorEl}
                     keepMounted
                     open={Boolean(anchorEl)}
                     onClose={handleClose}
                     style={{
                        position: "absolute",
                        top: "40px",
                     }}
                  >
                     <Link to="/account" className="header__link">
                        <MenuItem
                           onClick={handleClose}
                           className="header__userMenuItem"
                        >
                           <AccountCircle fontSize="small" />
                           My Profile
                        </MenuItem>
                     </Link>
                     <Link to="/account/orders" className="header__link">
                        <MenuItem
                           onClick={handleClose}
                           className="header__userMenuItem"
                        >
                           <Store fontSize="small" />
                           Orders
                        </MenuItem>
                     </Link>
                     <Link to="/account/wishlist" className="header__link">
                        <MenuItem
                           onClick={handleClose}
                           className="header__userMenuItem"
                        >
                           <Favorite fontSize="small" />
                           Wishlist
                        </MenuItem>
                     </Link>
                     <MenuItem
                        onClick={() => {
                           auth.signOut();
                           handleClose();
                           history.push("/");
                        }}
                        className="header__userMenuItem"
                     >
                        <ExitToApp fontSize="small" />
                        Logout
                     </MenuItem>
                  </Menu>
               </div>
            ) : (
               <button className="header__loginButton" onClick={toggleLogin}>
                  Login
               </button>
            )}
            <Link to="/cart" className="header__link header__link--white">
               <div className="header__cart">
                  <ShoppingCart />
                  Cart
               </div>
            </Link>
         </div>
      </div>
   );
};

export default Header;
