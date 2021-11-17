import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./auth.css"

function Login({ onSetUserLoggedIn }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [invalidLogin, setInvalidLogin] = useState(false);

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        const { valid } = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        }).then(res => res.json());
        
        if (valid) {
            onSetUserLoggedIn(username);
            navigate("/");
        } else {
            setInvalidLogin(true);
        }
    }

    return (
        <React.Fragment>
            {invalidLogin && <p style={{ color: "red" }}>Invalid login credentials</p>}
            <h2>Log In</h2>
            <form onSubmit={handleLogin}>
                <h4>Username</h4>
                <input type="text" onChange={e => setUsername(e.target.value)} />
                <h4>Password</h4>
                <input type="password" onChange={e => setPassword(e.target.value)} />
                <br />
                <input type="submit" className="login-signup-button" value="Log In" />
            </form>
            <h4>Don't have an account? <Link to="/signup" className="login-signup-link">Sign Up</Link></h4>
        </React.Fragment>
    );
}

export default Login;