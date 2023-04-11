import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = e.response;
                if (response && response.status == 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    const errorList = errors && (
        <div className="alert">
            {Object.keys(errors).map((key, index) => (
                <p key={index}>{errors[key][0]}</p>
            ))}
        </div>
    );

    return (
        <div>
            <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <form onSubmit={onSubmit}>
                        <h3 className="title">Sign For Free</h3>
                        {errorList}
                        <input
                            ref={nameRef}
                            type="text"
                            placeholder="Full Name"
                        />
                        <input
                            ref={emailRef}
                            type="email"
                            placeholder="Email"
                        />
                        <input
                            ref={passwordRef}
                            type="password"
                            placeholder="Password"
                        />
                        <input
                            ref={passwordConfirmationRef}
                            type="password"
                            placeholder="Password Confirmation"
                        />
                        <button className="btn btn-block">Sign Up</button>
                        <p className="message">
                            Already Registered?
                            <Link to="/login">Sign In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
