import { TextField } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { auth } from "../../firebase";

const SignUp = ({ changer }) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   const signUp = (e) => {
      e.preventDefault();
      if (password === confirmPassword) {
         auth
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
               alert("New Account Created Successfully");
               changer();
               setEmail("");
               setPassword("");
               setConfirmPassword("");
            })
            .catch((err) => alert(err.message));
      } else {
         alert("Password does not match");
      }
   };
   return (
      <Fragment>
         <div className="signUp__left">
            <div>
               <h2 className="signUp__title">Looks like you're new here!</h2>
               <p className="signUp__content">
                  Sign up with email to get started
               </p>
            </div>
            <img
               src="//img1a.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png"
               alt="logo"
            />
         </div>
         <div className="signUp__right">
            <form className="signUp__form">
               <TextField
                  type="text"
                  label="Enter Email"
                  className="signUp__input"
                  margin="dense"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <TextField
                  type="password"
                  label="Enter Password"
                  className="signUp__input"
                  margin="dense"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               <TextField
                  type="password"
                  label="Confirm Password"
                  className="signUp__input"
                  margin="dense"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
               />
               <button onClick={signUp} className="signUp__button">
                  SignUp
               </button>
            </form>
            <h6 className="signIn__transfer" onClick={changer}>
               Existing User? Log in
            </h6>
         </div>
      </Fragment>
   );
};

export default SignUp;
