import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import "./header.css";

const Header = () => {
  const { isLoggedIn, setLoggedIn } = useContext(userContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  return (
    <header>
      <Link className="header-title" to="/">
        <h1>Travelogue</h1>
      </Link>
      <div className="loginSignup">
        <ul className="nav">
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/about">
              About
            </Link>
          </li>
          {isLoggedIn ? (
            <div className="nav">
              <li>
                <Link className="link" to="/blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="link" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="link" to="/create">
                  Write
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>Log out</button>
              </li>
            </div>
          ) : (
            <div className="nav">
              <li>
                <Link className="link" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="link" to="/signup">
                  Sign up
                </Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
