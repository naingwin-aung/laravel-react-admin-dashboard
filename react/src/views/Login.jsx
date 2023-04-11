import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();
        setErrors(null);
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);

                if (data.code == 500) {
                    setErrors({
                        email: [data.message],
                    });
                }
            })
            .catch((e) => {
                const response = e.response;
                if (response && response.status == 422) {
                    setErrors(response.data.errors);
                    // if (response.data.errors) {
                    //     setErrors(response.data.errors);
                    // } else {
                    //     setErrors({
                    //         email: [response.data.message],
                    //     });
                    // }
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
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h3 className="title">Login to your account</h3>
                    {errorList}
                    <input type="email" ref={emailRef} placeholder="Email" />
                    <input
                        type="password"
                        ref={passwordRef}
                        placeholder="Password"
                    />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Register?
                        <Link to="/signup">Create An Account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
