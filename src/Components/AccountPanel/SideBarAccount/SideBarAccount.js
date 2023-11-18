import React, { useState } from "react";
import './SideBarAccount.css';
import { useTranslation } from "react-i18next";

const SideBarAccount = (props) => {
    const [t] = useTranslation("global");
    const [clasProfile, setClasProfile] = useState('defaultProfile');
    const [clasOrder, setClasOrder] = useState('defaultOrder');

    const HandleDropMenuOrder = (e) => {
        const NewClas = clasOrder === 'defaultOrder' ? 'activeOrder' : 'defaultOrder';
        setClasOrder(NewClas)
    };

    const HandleDropMenuProfile = (e) => {
        const NewClas = clasProfile === 'defaultProfile' ? 'activeProfile' : 'defaultProfile';
        setClasProfile(NewClas)
    };

    return (
        <div className="accountSideBar">
            <h1 className="font-gramatika-bold">{t("account.account")}</h1>
            <h2>Varvara Talankina</h2>
            <button
                className={props.tab === "MyAccount" ? "active" : "default"}
                onClick={() => { props.setTab("MyAccount") }}
            >
                <img src="../../IMG/icons8-home-96.png" alt="home" />{t("account.my_account")}
            </button>
            <div className={clasProfile}>
                <button className = "default" onClick={HandleDropMenuProfile}><img src="../../IMG/icons8-user-96.png" alt="profile" />{t("account.profile")}</button>
                <div className="account-drop">
                    <button
                        className={props.tab === "Personal" ? "active_drop" : "default_drop"}
                        onClick={() => { props.setTab("Personal") }}
                    >
                        {t("account.personal")}
                    </button>
                    <button
                        className={props.tab === "Addresses" ? "active_drop" : "default_drop"}
                        onClick={() => { props.setTab("Addresses") }}
                    >
                        {t("account.addresses")}
                    </button>
                    <button
                        className={props.tab === "Cards" ? "active_drop" : "default_drop"}
                        onClick={() => { props.setTab("Cards") }}
                    >
                        {t("account.cards")}
                    </button>
                    <button
                        className={props.tab === "Preferences" ? "active_drop" : "default_drop"}
                        onClick={() => { props.setTab("Preferences") }}
                    >
                        {t("account.preferences")}
                    </button>
                </div>
            </div>
            <div className={clasOrder}>
                <button className = "default" onClick={HandleDropMenuOrder}><img src="../../IMG/icons8-картонная-коробка-100.png" alt="orders" />{t("account.orders")}</button>
                <div className="account-drop">
                    <button
                        className={props.tab === "Order" ? "active_drop" : "default_drop"}
                        onClick={() => { props.setTab("Order") }}
                    >
                        {t("account.details")}
                    </button>
                </div>
            </div>
            <button
                className={props.tab === "Wishlist" ? "active" : "default"}
                onClick={() => { props.setTab("Wishlist") }}
            >
                <img src="../../IMG/icons8-закладка-100.png" alt="wishlist" />{t("account.wishlist")}
            </button>
        </div>
    )
}

export default SideBarAccount;
