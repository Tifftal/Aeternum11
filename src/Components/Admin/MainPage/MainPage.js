import React, { useState } from "react";
import "./MainPage.css"
import { useTranslation } from "react-i18next";
import Container2 from "../MainPage/Containers/Cont2"
import Container3 from "../MainPage/Containers/Cont3"
import Container4 from "./Containers/Cont4";


const MainPageAdmin = () => {
    return (
        <div className="main-page">
            <Container2 />
            <Container3 />
            <Container4 />
        </div>

    )
}

export default MainPageAdmin;