import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../context/userContext";
import { authContext } from "../context/authContext";
import { userNameContext } from "../context/userNameContext";
import "./login.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
      const res = await axios.post("/users/login", {
        email: userEmail,
        password: userPassword,
      });

      if (res.status === 200) {
        const accessToken = res.data.accessToken;

        localStorage.setItem("accessToken", accessToken);


        try {
          const response = await axios.get(
            "/users/login/success",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          // JSON.stringify(respones.data)
          // 리스폰스 데이타에서 {메세지: 디스이즈프로텍티드라우트, 유저: 유저네임} 이렇게 뜬다면...
          // 해야할것 첫번째 이름을 불러와야됨
          // 그럼 어떻게 해야하는가...response.data 에서 유저를 불러주면 되지
          
          if (response.data) {
            setLoggedIn(true);
            setAuthToken(accessToken);
            setUserName(response.data.user);
            setUserEmail("");
            setUserPassword("");
          }
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
            <Link className="link link-signup" to="/signup">
              Sign up
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
