import React, { useState } from "react";
import { LoginAPI} from "../api/AuthAPI";
import "../css/LoginComponent.css";
import { useNavigate } from "react-router-dom";
import LinkedinLogo from "../assets/linkedinLogo.png";
import { toast } from "react-toastify";
import { MdLanguage } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Dropdown } from "antd";

function LoginComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
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

  const login = async () => {
    try {
      let res = await LoginAPI(credentails.email, credentails.password);
      toast.success(t("toast.login"));
      navigate("/home");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error(t("toast.login-err"));
    }
  };


  return (
    <div className="login-wrapper">
      <div
        className="header-container"
      >
        <h1
          style={{
            fontSize: "38px",
            fontFamily: "system-ui",
            color: "#0073b1",
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
          <MdLanguage className="dropdown" style={{ fontSize: "24px", cursor: "pointer" }} />
        </Dropdown>
      </div>

      <div className="login-wrapper-inner">
        <h1 className="heading">{t("header.loginPage")}</h1>
        <p className="sub-heading">{t("paragraph.loginPage")}</p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder={t("input.loginPageOne")}
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder={t("input.loginPageTwo")}
          />
        </div>
        <button onClick={login} className="login-btn">
          {t("button.loginPage")}
        </button>
      </div>
      <hr className="hr-text" data-content={t("hr.login")} />
      <div className="google-btn-container">
        <p className="go-to-signup">
          {t("paragraph.loginPageTwo")}?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            {t("link.loginPage")}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginComponent;
