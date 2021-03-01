import React, { Fragment, useState } from "react";

// Material-UI
import {
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
} from "@material-ui/core";

//Firebase

import { auth } from "../../firebase";

const SignUp = ({ changer }) => {
    const initialState = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };
    const initialError = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const [credentials, setCredentials] = useState(initialState);
    const [error, setError] = useState(initialError);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const validate = () => {
        let nameError = "";
        let emailError = "";
        let passwordError = "";
        let confirmPasswordError = "";

        if (credentials.name.trim() === "") {
            nameError = "Please enter your name";
        }

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
        if (credentials.password !== credentials.confirmPassword) {
            confirmPasswordError = "Password does not match";
        }
        if (emailError || passwordError || nameError || confirmPasswordError) {
            setError({
                ...error,
                name: nameError,
                email: emailError,
                password: passwordError,
                confirmPassword: confirmPasswordError,
            });
            return false;
        }
        return true;
    };

    const signUp = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (isValid) {
            console.log(credentials);
            setError(initialError);
            setCredentials(initialState);
        }
        //   if (password === confirmPassword) {
        //       auth.createUserWithEmailAndPassword(email, password)
        //           .then((user) => {
        //               alert("New Account Created Successfully");
        //               changer();
        //               setEmail("");
        //               setPassword("");
        //               setConfirmPassword("");
        //           })
        //           .catch((err) => alert(err.message));
        //   } else {
        //       alert("Password does not match");
        //   }
    };
    return (
        <Fragment>
            <div className="signUp__left">
                <div>
                    <h2 className="signUp__title">
                        Looks like you're new here!
                    </h2>
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
                    <FormControl error={error.name}>
                        <InputLabel htmlFor="component-error">
                            Full Name
                        </InputLabel>
                        <Input
                            id="component-error"
                            value={credentials.name}
                            name="name"
                            onChange={handleChange}
                            aria-describedby="component-error-text"
                            type="text"
                        />
                        {error.name && (
                            <FormHelperText id="component-error-text">
                                {error.name}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl error={error.email}>
                        <InputLabel htmlFor="component-error">
                            Email Address
                        </InputLabel>
                        <Input
                            id="component-error"
                            value={credentials.email}
                            name="email"
                            onChange={handleChange}
                            aria-describedby="component-error-text"
                            type="email"
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
                            type="password"
                        />
                        {error.password && (
                            <FormHelperText id="component-error-text">
                                {error.password}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl error={error.confirmPassword}>
                        <InputLabel htmlFor="component-error">
                            Confirm Password
                        </InputLabel>
                        <Input
                            id="component-error"
                            value={credentials.confirmPassword}
                            name="confirmPassword"
                            onChange={handleChange}
                            aria-describedby="component-error-text"
                            type="password"
                        />
                        {error.confirmPassword && (
                            <FormHelperText id="component-error-text">
                                {error.confirmPassword}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <button onClick={signUp} className="signUp__button">
                        SignUp
                    </button>
                </form>
                <h6 className="signIn__navigator" onClick={changer}>
                    Existing User? Log in
                </h6>
            </div>
        </Fragment>
    );
};

export default SignUp;
