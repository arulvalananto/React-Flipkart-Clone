import { Clear } from "@material-ui/icons";
import React, { Fragment, useState } from "react";
import { actionTypes } from "../../contextAPI/reducer";
import { useStateValue } from "../../contextAPI/StateProvider";
import "./Auth.css";
//components
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Auth = () => {
   const [state, dispatch] = useStateValue();
   const [changeLogin, setChangeLogin] = useState(false);
   const toggleLogin = () => {
      dispatch({ type: actionTypes.TOGGLE_LOGIN, condition: false });
   };
   const signInToSignUp = () => {
      setChangeLogin((prevState) => !prevState);
   };

   return (
      <Fragment>
         <div className="auth__background"></div>
         <div className="auth">
            <div className="auth__container">
               {changeLogin ? (
                  <SignUp changer={signInToSignUp} />
               ) : (
                  <SignIn changer={signInToSignUp} />
               )}
               <button className="auth__toggleButton" onClick={toggleLogin}>
                  <Clear />
               </button>
            </div>
         </div>
      </Fragment>
   );
};

export default Auth;
