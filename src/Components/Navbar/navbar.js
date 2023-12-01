import React, { useState } from "react";
import './navbar.css';
import DropW from "./DropDownMenu/dropWomen";

import Popup from "../Popup/Popup";

import { useAuth } from "../../Context/AuthContext";

const Navbar = () => {
    const { jwtToken } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const HandleOpenNote = () => {
        if (jwtToken) {
            window.localStorage.setItem("account", "account")
            window.location.href = "/account"
        } else {
            setIsOpen(true)
        }
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
                        Женщины
                    </button>
                    <div className="content">
                        <DropW />
                    </div>
                </div>
            </div>
            {window.innerWidth > 768 ? (
                <div className="center font-gramatika-bold">
                    <a href="/"> Aeternum Eleven </a>
                </div>
            ) : (
                <img src="../../IMG/Group 6.png"/>
            )
            }
            <div className="right">
                {jwtToken ? (
                    <button className="ordinary" onClick={HandleOpenNote}>
                        Профиль
                    </button>
                ) : (
                    <button className="ordinary" onClick={HandleOpenNote}>
                        Войти
                    </button>
                )}
                {jwtToken ? (
                    <>
                        {window.innerWidth > 768 ? (
                            <a href="/bw">
                                <button className="ordinary" onClick={() => { window.localStorage.setItem("bw", "wishlist") }}>
                                    Вишлист
                                </button>
                            </a>
                        ): (null)
                        }
                        <a href="/bw">
                            <button className="ordinary" onClick={() => { window.localStorage.setItem("bw", "bag") }}>
                                Корзина
                            </button>
                        </a>
                        <a href="/account">
                            <button className="ordinary" onClick={() => { window.localStorage.setItem("account", "orders") }}>Заказы</button>
                        </a>
                    </>
                ) : (
                    null
                )
                }
                {/* <button className="lang" onClick={() => handleChangeLanguage("ru")}>
                    {language.toUpperCase()}
                </button> */}
            </div>
        </div>
    )
}

export default Navbar;