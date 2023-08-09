import React, { useState } from "react";
import './navbar.css';
import { useTranslation } from "react-i18next";
import DropW from "./DropDownMenu/dropWomen";
import DropUn from "./DropDownMenu/dropUnisex";

const Navbar = () => {
    const [language, setLanguage] = useState("ru");
    const [t, i18n] = useTranslation("global");
    const handleChangeLanguage = (e) => {
        const newLanguage = language === "en" ? "ru" : "en";
        const languageToShow = newLanguage === "ru" ? "en" : "ru"
        setLanguage(newLanguage)
        i18n.changeLanguage(languageToShow);
    };

    return (
        <div className="navbar">
            <div className="left">
                <div className="dropDown">
                    <button className="dropDownBtn">
                        {t("navbar.women")}
                    </button>
                    <div className="content">
                        <DropW />
                    </div>
                </div>
                <div className="dropDown">
                    <button className="dropDownBtn">
                        {t("navbar.all gender")}
                    </button>
                    <div className="content">
                        <DropUn />
                    </div>
                </div>
                <a href="/about">
                    <button className="ordinary">
                        {t("navbar.about us")}
                    </button>
                </a>
                <button className="ordinary">
                    {t("navbar.search")}
                </button>
            </div>
            <div className="center">
                <a href="/"> Aeternum Eleven </a>
            </div>
            <div className="right">
                <a href="/create_account">
                    <button className="ordinary">
                        {t("navbar.account")}
                    </button>
                </a>
                <a href="/wishlist">
                    <button className="ordinary">
                        {t("navbar.wishlist")}
                    </button>
                </a>
                <a href="/bag">
                    <button className="ordinary">
                        {t("navbar.bag")}
                    </button>
                </a>
                <button className="lang" onClick={() => handleChangeLanguage("ru")}>
                    {language.toUpperCase()}
                </button>
            </div>
        </div>
    )
}

export default Navbar;