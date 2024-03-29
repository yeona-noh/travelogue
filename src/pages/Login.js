import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../context/userContext";
import { authContext } from "../context/authContext";
import { userNameContext } from "../context/userNameContext";
import "./login.css";
import Header from "../components/Header";

function Login() {
  const { setLoggedIn } = useContext(userContext);
  const { setAuthToken } = useContext(authContext);
  const { setUserName } = useContext(userNameContext);
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5001/login", {
        email: userEmail,
        password: userPassword,
      });

      if (res.status === 200) {
        const accessToken = res.data.accessToken;

        localStorage.setItem("accessToken", accessToken);


        try {
          const response = await axios.get(
            "http://localhost:5001/login/success",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          console.log(response.data,"line42")
          if (response.data) {
            setLoggedIn(true);
            setAuthToken(accessToken);
            setUserName(response.data.user);
            setUserEmail("");
            setUserPassword("");
          }
          console.log(response.data.user);
          navigate("/");
        } catch (error) {
          console.log(error.message);
        }
      } 
    } catch (error) {
      console.log("login failed",error);
      alert(error.response.data)
    }
  };

  return (
    <div className="login-container">
      <div className="login-header login-signup-header">
        <Header />
      </div>
      <div className="login-background">
        <form className="login-signup-form">
          <label>Login</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          ></input>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          ></input>
          <input
            onClick={handleLogin}
            type="button"
            className="submit"
            value="Go"
          ></input>
          <p className="link">
            Need an account?{" "}
            <Link className="link" to="/signup">
              {" "}
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
