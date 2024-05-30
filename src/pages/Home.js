import React from "react";
import Header from "../components/Header";
import Intro from "../components/Intro";
import Footer from "../components/Footer";
import Previewcards from "../components/Previewcards";
import Main from "../components/Main";
import "./home.css";

function Home() {
  return (
    <div className="home">
      <Header />
      <Intro />
      <Main />
      <Footer />
    </div>
  );
}

export default Home;
