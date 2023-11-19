import React, { useState, useEffect } from "react";
import './navbar.css';
import { useTranslation } from "react-i18next";
import DropW from "./DropDownMenu/dropWomen";
import DropUn from "./DropDownMenu/dropUnisex";
import Popup from "../Popup/Popup";
import axios from "axios";
import { URI } from "../../api/config";

const Navbar = () => {
    const [language, setLanguage] = useState("ru");
    const [t, i18n] = useTranslation("global");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

    useEffect(() => {
        axios.get(`${URI}/category/${1}/goods`)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        })
    })

    const handleChangeLanguage = (e) => {
        const newLanguage = language === "en" ? "ru" : "en";
        const languageToShow = newLanguage === "ru" ? "en" : "ru"
        setLanguage(newLanguage)
        i18n.changeLanguage(languageToShow);
    };

    const [isOpen, setIsOpen] = useState(false);

    const HandleOpenNote = () => {
        setIsOpen(true)
    };

    const HandleCloseNote = () => {
        setIsOpen(false)
    };
    
    return (
        <div className="navbar">
            {isOpen && (
                <Popup onClose={HandleCloseNote} setIsOpen={setIsOpen} />
            )}
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
                <button className="ordinary">
                    {t("navbar.search")}
                </button>
            </div>
            { window.innerWidth > 768 ? (
            <div className="center font-gramatika-bold">
                <a href="/"> Aeternum Eleven </a>
            </div>
            ) : (
                null
            )
            }
            <div className="right">
                <button className="ordinary" onClick={HandleOpenNote}>
                    {t("navbar.account")}
                </button>
                <a href="/bw">
                    <button className="ordinary">
                        {t("navbar.wishlist")}
                    </button>
                </a>
                <a href="/bw">
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