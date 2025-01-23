import React from "react";
import { useNavigate } from "react-router-dom";
import GettingStarted from "../assets/first_page photo.svg";
import LinkedinLogo from "../assets/linkedinLogo.png";
import { useTranslation } from "react-i18next";
import "./FirstPage.css";

function FirstPage() {
  let navigate = useNavigate();
  const [t, i18n] = useTranslation ("global")
  const changeLang = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem("language", lang);
  };
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
      <button onClick={ () => changeLang("en")}>{t("language.en")}</button>
      <button  onClick={ () => changeLang("al")}>{t("language.al")}</button>
      </div>
      <div className="welcome">
      <div className="welcome_1">
      <h1 className="welcome_content"> {t("header")} </h1>
      <div className="welcome_buttons">
      <button className="getting-started" onClick={() =>{
          console.log("Navigating to /login");
        navigate("/login")}}>
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
