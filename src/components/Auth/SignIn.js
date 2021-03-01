import React, { Fragment, useState } from "react";

// Material-UI
import {
    FormHelperText,
    Input,
    InputLabel,
    FormControl,
    makeStyles,
} from "@material-ui/core";
// ContextAPI
import { actionTypes } from "../../contextAPI/reducer";
import { useStateValue } from "../../contextAPI/StateProvider";
// Firebase
import { auth } from "../../firebase";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));

const SignIn = ({ changer }) => {
    const initialState = {
        email: "",
        password: "",
    };
    const initialError = {
        email: "",
        password: "",
    };

    const [state, dispatch] = useStateValue();

    const classes = useStyles();

    const [credentials, setCredentials] = useState(initialState);
    const [error, setError] = useState(initialError);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        let emailError = "";
        let passwordError = "";

        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (
            credentials.email.trim() === "" ||
            !emailPattern.test(String(credentials.email).toLowerCase())
        ) {
            emailError = "Please enter valid email address";
        }
        if (
            credentials.password.trim() === "" ||
            credentials.password.length < 8
        ) {
            passwordError = "Password must be above 8 characters";
        }
        if (emailError || passwordError) {
            setError({
                ...error,
                email: emailError,
                password: passwordError,
            });
            return false;
        }
        return true;
    };

    const signIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        const isValid = validate();
        if (isValid) {
            setError(initialError);
            setCredentials(initialState);
        }
        setLoading(false);

        //   setLoading(true);
        //   await auth.signInWithEmailAndPassword(credentials.email, credentials.password)
        //       .then(() => {
        //           setcredentials(initialState);
        //           dispatch({
        //               type: actionTypes.TOGGLE_LOGIN,
        //               condition: false,
        //           });
        //       })
        //       .then(() => setLoading(false))
        //       .catch((e) => {
        //           console.log(e);
        //           setLoading(false);
        //       });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
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
                <form className={`signIn__form ${classes.root}`} autoComplete>
                    <FormControl error={error.email}>
                        <InputLabel htmlFor="component-error">
                            Email Address
                        </InputLabel>
                        <Input
                            name="email"
                            id="component-error"
                            value={credentials.email}
                            onChange={handleChange}
                            aria-describedby="component-error-text"
                        />
                        {error.email && (
                            <FormHelperText id="component-error-text">
                                {error.email}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl error={error.password}>
                        <InputLabel htmlFor="component-error">
                            Password
                        </InputLabel>
                        <Input
                            id="component-error"
                            value={credentials.password}
                            name="password"
                            onChange={handleChange}
                            aria-describedby="component-error-text"
                        />
                        {error.password && (
                            <FormHelperText id="component-error-text">
                                {error.password}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <button
                        className="signIn__button"
                        onClick={signIn}
                        disabled={loading}
                    >
                        Login
                    </button>
                </form>
                <p className="signIn_option">OR</p>
                <h6 className="signIn__navigator" onClick={changer}>
                    New to Flipkart? Create an account
                </h6>
            </div>
        </Fragment>
    );
};

export default SignIn;
