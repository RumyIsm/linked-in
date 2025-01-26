import React from "react";
import { useNavigate } from "react-router-dom";
import GettingStarted from "../assets/first_page photo.svg";
import LinkedinLogo from "../assets/linkedinLogo.png";
import { useTranslation } from "react-i18next";
import { Dropdown } from "antd";
import { MdLanguage } from "react-icons/md";
import "./FirstPage.css";

function FirstPage() {
  let navigate = useNavigate();
  const { t, i18n } = useTranslation("global");

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const languageMenu = [
    {
      key: "en",
      label: (
        <div onClick={() => changeLang("en")} style={{ cursor: "pointer" }}>
          {t("language.en")}
        </div>
      ),
    },
    {
      key: "al",
      label: (
        <div onClick={() => changeLang("al")} style={{ cursor: "pointer" }}>
          {t("language.al")}
        </div>
      ),
    },
  ];

  return (
    <div className="get_start">
      <div className="navbarr">
        <div className="first_page_logo">
          <h1
            className="first_page_logoo"
            style={{
              fontSize: "38px",
              fontFamily: "system-ui",
              color: " #0073b1",
              marginLeft: "100px",
            }}
          >
            Linked
            <img
              src={LinkedinLogo}
              className="linkedinLogo"
              alt="LinkedIn Logo"
            />
          </h1>

          <Dropdown menu={{ items: languageMenu }} placement="bottom" arrow>
            <MdLanguage
              style={{
                marginRight: "8px",
                fontSize: "18px",
                cursor: "pointer",
                marginTop: "50px",
                marginRight: "50px",
              }}
            />
          </Dropdown>
        </div>
        <div className="welcome">
          <div className="welcome_1">
            <h1 className="welcome_content">{t("header.firstPage")}</h1>
            <div className="welcome_buttons">
              <button
                className="getting-started"
                onClick={() => {
                  console.log("Navigating to /login");
                  navigate("/login");
                }}
              >
                {t("button.oneFirstPage")}
              </button>
              <button
                className="getting-startedd"
                onClick={() => navigate("/register")}
              >
                {t("button.twoFirstPage")}
              </button>
            </div>
          </div>
          <div className="welcome_2">
            <img
              src={GettingStarted}
              alt="Getting started"
              className="getting_started"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstPage;
