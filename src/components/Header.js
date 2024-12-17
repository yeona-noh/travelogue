import React, { useContext } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
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
            <NavLink className="link" activeClassName="active" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="link" activeClassName="active" to="/about">
              About
            </NavLink>
          </li>
          {isLoggedIn ? (
            <div className="nav">
              <li>
                <NavLink className="link" activeClassName="active" to="/blog">
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink className="link" activeClassName="active" to="/create">
                  Write
                </NavLink>
              </li>
              <li>
                <button className="link logout-btn" onClick={handleLogout}>Log out</button>
              </li>
            </div>
          ) : (
            <div className="nav">
              <li>
                <NavLink className="link" activeClassName="active" to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className="link" activeClassName="active" to="/signup">
                  Sign up
                </NavLink>
              </li>
            </div>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
