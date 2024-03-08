import React  from "react";
import { Outlet, Link } from "react-router-dom";
import "./header.css";

const Header = () => {
    return (
        <header>
            <h1>
                Travelogue
            </h1>
            <div className="loginSignup">
                <ul className="nav">
                    <li><Link className="link" to="/">Home</Link></li>
                    <li><Link className="link" to="/about">About</Link></li>
                    <li><Link className="link" to="/blog">Blog</Link></li>
                    <li><Link className="link" to="/contact">Contact</Link></li>
                    <li><Link className="link" to="/login">Login</Link></li>
                    <li><Link className="link" to="/signup">Sign up</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default Header;