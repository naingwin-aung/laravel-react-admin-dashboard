import React from "react";
import { Link } from "react-router-dom";

function Login() {
    const onSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h3 className="title">Login to your account</h3>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
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
