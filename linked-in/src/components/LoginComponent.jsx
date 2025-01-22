import React, { useState }  from "react";
import { LoginAPI, GoogleSignInAPI } from "../api/AuthAPI";
import "../css/LoginComponent.css";
import { useNavigate } from "react-router-dom";
import LinkedinLogo from "../assets/linkedinLogo.png";
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";

function LoginComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});

  const login = async () => {
    try {
      let res = await LoginAPI(credentails.email, credentails.password);
      toast.success("Signed In to Linkedin!");
      navigate("/home");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Please Check your Credentials");
    }
  };

  const googleSignIn = () => {
    let response = GoogleSignInAPI();
    navigate("/home");
  };

  return (
    <div className="login-wrapper">
      <h1
        style={{ fontSize: "38px", fontFamily: "system-ui", color: " #0073b1" , marginLeft:"100px"}}
      >
        Linked
        <img src={LinkedinLogo} className="linkedinLogo" alt="LinkedIn Logo" />
      </h1>

      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on your professional world</p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>
        <button onClick={login} className="login-btn">
          Sign in
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <GoogleButton
          style={{
            width: "300px",
            fontSize: "18px",
            borderRadius: "25px",
            background: "none",
          }}
          type="light"
          label="Continue with Google"
          className="google-btn"
          onClick={googleSignIn}
        />
        <p className="go-to-signup">
          Already to LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginComponent;
