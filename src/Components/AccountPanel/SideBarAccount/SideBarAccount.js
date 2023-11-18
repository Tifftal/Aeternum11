import React, { useState } from "react";
import './SideBarAccount.css';
import { useTranslation } from "react-i18next";

const SideBarAccount = (props) => {
    const [t] = useTranslation("global");
    const [clasProfile, setClasProfile] = useState('default');

    const HandleDropMenuProfile = (e) => {
        const NewClas = clasProfile === 'defaultProfile' ? 'activeProfile' : 'defaultProfile';
        setClasProfile(NewClas)
    };

    return (
        <div className="accountSideBar">
            <h1 className="font-gramatika-bold">{t("account.account")}</h1>
            <h2>Varvara Talankina</h2>
            <button
                className={props.tab === "MyAccount" ? "active" : ""}
                onClick={() => { props.setTab("MyAccount") }}
            >
                <img src="../../IMG/icons8-home-96.png" alt="home" />{t("account.my_account")}
            </button>
            <div className={clasProfile}>
                <button onClick={HandleDropMenuProfile}><img src="../../IMG/icons8-user-96.png" alt="profile" />{t("account.profile")}</button>
                <div className="account-drop">
                    <button
                        className={props.tab === "Personal" ? "active_drop" : "default_drop"}
                        onClick={() => { props.setTab("Personal") }}
                    >
                        {t("account.personal")}
                    </button>
                    <a href="/account">{t("account.addresses")}</a>
                    <a href="/account">{t("account.cards")}</a>
                    <a href="/account">{t("account.preferences")}</a>
                </div>
            </div>
            <button
                className={props.tab === "Profile" ? "active" : ""}
                onClick={() => { props.setTab("Profile") }}
            >
                <img src="../../IMG/icons8-user-96.png" alt="profile" />{t("account.profile")}
            </button>
            <button
                className={props.tab === "Wishlist" ? "active" : ""}
                onClick={() => { props.setTab("Wishlist") }}
            >
                <img src="../../IMG/icons8-закладка-100.png" alt="wishlist" />{t("account.wishlist")}
            </button>
        </div>
    )
}

export default SideBarAccount;
