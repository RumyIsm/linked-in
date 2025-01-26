import React, { useState, useMemo } from "react";
import "./ProfilePopup.css";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../api/FirestoreAPI";
import { useTranslation } from "react-i18next";
import Button from "../button/Button";

function ProfilePopup() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const { t, i18n } = useTranslation("global");
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div className="popup-card">
      <p className="name">{currentUser?.name}</p>
      <p className="headline">{currentUser?.headline}</p>

      <Button
        title={t("button.popupOne")}
        onClick={() =>
          navigate("/profile", {
            state: {
              id: currentUser?.id,
            },
          })
        }
      />

      <Button title={t("button.popupTwo")} onClick={() => navigate("/")} />
    </div>
  );
}

export default ProfilePopup;
