import { TextField } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { actionTypes } from "../../contextAPI/reducer";
import { useStateValue } from "../../contextAPI/StateProvider";
import { auth } from "../../firebase";

const SignIn = ({ changer }) => {
   const [state, dispatch] = useStateValue();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const signIn = (e) => {
      e.preventDefault();
      auth.signInWithEmailAndPassword(email, password).then((user) => {
         setEmail("");
         setPassword("");
         dispatch({
            type: actionTypes.TOGGLE_LOGIN,
            condition: false,
         });
      });
   };
   return (
      <Fragment>
         <div className="signIn__left">
            <div>
               <h2 className="signIn__title">Login</h2>
               <p className="signIn__content">
                  Get access to your Orders, Wishlist and Recommendations
               </p>
            </div>
            <img
               src="//img1a.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png"
               alt="logo"
            />
         </div>
         <div className="signIn__right">
            <form className="signIn__form" onSubmit={signIn}>
               <TextField
                  type="text"
                  label="Enter Email"
                  className="signIn__input"
                  margin="dense"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <TextField
                  type="password"
                  label="Enter Password"
                  className="signIn__input"
                  margin="dense"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               <button className="signIn__button">Login</button>
            </form>
            <p className="signIn_option">OR</p>
            <h6 className="signIn__transfer" onClick={changer}>
               New to Flipkart? Create an account
            </h6>
         </div>
      </Fragment>
   );
};

export default SignIn;
