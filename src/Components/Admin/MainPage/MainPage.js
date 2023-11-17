import React, { useState } from "react";
import "./MainPage.css"
import { useTranslation } from "react-i18next";
import Container2 from "../MainPage/Containers/Cont2"
import Container3 from "../MainPage/Containers/Cont3"


const MainPageAdmin = () => {
    return (
        <div className="main-page">
            <Container2/>
            <Container3/>
        </div>

    )
}

export default MainPageAdmin;