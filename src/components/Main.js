import React, { useContext } from "react";
import { userContext } from "../context/userContext";
import { userNameContext } from "../context/userNameContext";
import "./main.css";

function Main() {
  const { isLoggedIn } = useContext(userContext);
  const { userName } = useContext(userNameContext);
  return (
    <div className="main-container">
      {isLoggedIn ? (
        <h1 className="main-greeting">Hello, {userName}!</h1>
      ) : (
        <h1 className="main-greeting">Hi, there!</h1>
      )}
    </div>
  );
}

export default Main;
