import React, { useState, useEffect } from "react";
import "./index.css";
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import ProfilePopup from "../profilepopup/ProfilePopup";
import SearchUsers from "../searchusers/SearchUsers";
import { getAllUsers } from "../../../api/FirestoreAPI";
import { MdLanguage } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Button, Dropdown } from "antd";

function Topbar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

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

  let navigate = useNavigate();
  const goToRoute = (route) => {
    navigate(route);
  };

  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchInput]);

  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}
      <img
        src={LinkedinLogo}
        alt="LinkedinLogo"
        className="linkedin-logo"
        onClick={() => navigate("/home")}
      />

      {isSearch ? (
        <SearchUsers
          setIsSearch={setIsSearch}
          setSearchInput={setSearchInput}
        />
      ) : (
        <div className="react-icons">
          <AiOutlineSearch
            size={23}
            className="react-icon"
            onClick={() => setIsSearch(true)}
          />
          <AiOutlineHome
            size={23}
            className="react-icon"
            onClick={() => goToRoute("/home")}
          />
          <AiOutlineUserSwitch
            size={23}
            className="react-icon"
            onClick={() => goToRoute("/connections")}
          />
          <LuBriefcaseBusiness size={23} className="react-icon" />
          <AiOutlineMessage size={23} className="react-icon" />
          <AiOutlineBell size={23} className="react-icon" />
          <Dropdown menu={{ items: languageMenu }} placement="bottom" arrow>
            <MdLanguage size={23} className="react-icon" />
          </Dropdown>
        </div>
      )}

      <img
        className="user-logo"
        src={currentUser?.imageLink}
        alt="user"
        onClick={displayPopup}
      />

      {searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="search-results">
          {filteredUsers.length === 0 ? (
            <div className="search-inner">{t("paragraph.topbar")}</div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="search-inner"
                onClick={() => openUser(user)}
              >
                <img src={user.imageLink} />
                <p className="name">{user.name}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Topbar;
