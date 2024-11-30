import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import "./signup.css";
import Header from "../components/Header";

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
      try {
        const res = await axios.post("/users/signup", {
          name: name,
          email: email,
          password: password,
        });
      } catch (error) {
        alert(error.res.data);
        console.log(error.res.data);
      }
    }
    } catch (error) {
      console.log(error)
    }
    
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <div className="signup-container">
      <div className="signup-header login-signup-header">
        <Header />
      </div>
      <div className="signup-background">
        <form className="login-signup-form">
          <label>Sign up</label>
          <input
            name="name"
            value={name}
            type="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          ></input>

          <input
            name="email"
            value={email}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>

          <input
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>

          <input
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></input>

          <input
            onClick={handleSubmit}
            className="submit"
            type="submit"
          ></input>
          <p className="link">
            Already have an account?{" "}
            <Link className="link" to="/login">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
