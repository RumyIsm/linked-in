import React from "react";
import { useNavigate } from "react-router-dom";
import GettingStarted from "../assets/first_page photo.svg";
import LinkedinLogo from "../assets/linkedinLogo.png";
import "./FirstPage.css";

function FirstPage() {
  let navigate = useNavigate();
  return (
    <div className="get_start">
      <div className="navbarr">
        <div className="first_page_logo" >
      <h1
      className="first_page_logoo"
        style={{ fontSize: "38px", fontFamily: "system-ui", color: " #0073b1" , marginLeft:"100px"}}
      >
        Linked
        <img src={LinkedinLogo} className="linkedinLogo" alt="LinkedIn Logo" />
      </h1>
      </div>
      <div className="welcome">
      <div className="welcome_1">
      <h1 className="welcome_content"> Welcome to your professional community </h1>
      <div className="welcome_buttons">
      <button className="getting-started" onClick={() => navigate("/login")}>
        Sign in
      </button>
      <button
        className="getting-startedd"
        onClick={() => navigate("/register")}
      >
        Join now
      </button>
      </div>
      </div>
      <div className="welcome_2">
      <img src={GettingStarted} alt="Getting started" className="getting_started" />
      </div>
      </div>
      </div>
    </div>
  );
}

export default FirstPage;
