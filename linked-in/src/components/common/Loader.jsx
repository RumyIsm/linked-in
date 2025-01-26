import React from 'react'
import { Spin } from "antd";
import "./Common.css"

function Loader() {
    return (
        <div className='loader '>
         <p>{t("loader.page")} </p> 
        <Spin size='large' />
        </div>
    )
}

export default Loader
