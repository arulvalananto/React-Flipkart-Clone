import React, { useState } from "react";
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
import { Link } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        {false ? (
          <div>
            <p
              className="header__userMenu"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              {"username".toUpperCase()}
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
              <MenuItem onClick={handleClose} className="header__userMenuItem">
                <ExitToApp fontSize="small" />
                Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <button className="header__loginButton">Login</button>
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
