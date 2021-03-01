import React, { Fragment, useState } from "react";
import "./Auth.css";
//components
import SignIn from "./SignIn";
import SignUp from "./SignUp";

// MaterialUI
import { Clear } from "@material-ui/icons";

// ContextAPI
import { actionTypes } from "../../contextAPI/reducer";
import { useStateValue } from "../../contextAPI/StateProvider";

const Auth = () => {
    const [state, dispatch] = useStateValue();
    const [changeLogin, setChangeLogin] = useState(false);

    const toggleLogin = () => {
        dispatch({ type: actionTypes.TOGGLE_LOGIN, condition: false });
    };
    const handleNavigation = () => {
        setChangeLogin((prevState) => !prevState);
    };

    return (
        <Fragment>
            <div className="auth__background"></div>
            <div className="auth">
                <div className="auth__container">
                    {changeLogin ? (
                        <SignUp changer={handleNavigation} />
                    ) : (
                        <SignIn changer={handleNavigation} />
                    )}
                    <button
                        className="auth__toggleButton"
                        onClick={toggleLogin}
                    >
                        <Clear />
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default Auth;
