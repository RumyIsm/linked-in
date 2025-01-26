import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./SearchUsers.css";

function SearchUsers({ setIsSearch, setSearchInput }) {
  const { t, i18n } = useTranslation("global");
  return (
    <div className="search-users">
      <input
        placeholder={t("paragraph.topbarTwo")}
        onChange={(event) => setSearchInput(event.target.value)}
      />
      <CloseCircleOutlined
        className="close-icon"
        onClick={() => {
          setIsSearch(false);
          setSearchInput("");
        }}
      />
    </div>
  );
}

export default SearchUsers;
