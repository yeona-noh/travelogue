import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../context/userContext";
import { authContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Intro from "../components/Intro";
import Footer from "../components/Footer";
import "./about.css";


const About = () => {
  const { isLoggedIn } = useContext(userContext);
  const { authToken } = useContext(authContext);
  const [userInfos, setUserInfos] = useState([]);
  const [writeInfo, setWriteInfo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
    try {
      let res = await axios.get("http://localhost:5001/about");
      console.log(res.data);
      setUserInfos(res.data);
    } catch (error) {
      console.log(error, "getUserDetail error");
    }
  };
//when the new user created, there's no input on about content. 
//need to use update query for db to updata about column from null to input data.
//use filter function to solve the issue when there is no content in about column.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:5001/writeabout",
        {
          about: writeInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setWriteInfo("");
      navigate("/about");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="about">
      <Header />
      <Intro />
      <div className="about-container">
        <h1>Travelers</h1>
        <div className="about-content">
          {/* <img className="about-img" src="../../img/Aya Takano.jpeg" />
          <p>
            Amet sunt deserunt nostrud labore incididunt fugiat Lorem. Duis
            magna sit do aliqua labore velit ad esse laborum est. Voluptate
            commodo sit ad nulla commodo enim. Voluptate duis ullamco officia
            commodo ea sit in et. Sint nulla incididunt aliqua ullamco in
            ullamco labore. Ullamco culpa et dolore quis. Elit enim laborum
            commodo deserunt irure voluptate deserunt elit. Laborum veniam
            tempor cupidatat nostrud qui officia voluptate in amet. Sunt esse
            occaecat occaecat mollit. Aliqua veniam et nisi aute anim voluptate.
            Laborum culpa minim minim quis esse ut id. Et aliquip velit esse
            proident consequat voluptate incididunt duis commodo. Enim eiusmod
            nostrud nostrud aliqua eu elit. Eu occaecat nulla ipsum ipsum enim
            fugiat culpa et est proident. Mollit veniam adipisicing mollit
            veniam consectetur est aliqua reprehenderit velit amet ipsum
            deserunt minim.
          </p> */}

          {userInfos.filter((userInfo) => 
            userInfo.about !== null).map((userInfo) =>
            <div className="userInfo-container">
              <p className="user-name">{userInfo.name}</p>
              <p className="user-introduction">{userInfo.about}</p>
            </div>
          )}
          {isLoggedIn ? (
            <div className="write-introduction">
              <h2>Introduce yourself</h2>
              <textarea
                className="introduction-box"
                maxLength={500}
                value={writeInfo}
                onChange={(e) => setWriteInfo(e.target.value)}
                required
              />
              <button onClick={handleSubmit} className="submit-introduction">
                Submit
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
