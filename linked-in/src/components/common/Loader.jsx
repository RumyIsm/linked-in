import React from 'react'
import { Spin } from "antd";
import "./Common.css"
import { useTranslation } from "react-i18next";

function Loader() {
    const { t } = useTranslation("global");
    return (
        <div className='loader '>
         <p>{t("loader.page")} </p> 
        <Spin size='large' />
        </div>
    )
}

export default Loader
