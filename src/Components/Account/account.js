import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./account.css";
// import MyAccount from "./My Account/myAccount";
// import Personal from "./PersInf/personal";

const Account = () => {
    const [t] = useTranslation("global");

    const [clasProfile, setClasProfile] = useState('default');
    const [clasOrder, setClasOrder] = useState('default');

    const HandleDropMenuProfile = (e) => {
        const NewClas = clasProfile === 'default' ? 'active' : 'default';
        setClasProfile(NewClas)
    };
    const HandleDropMenuOrder = (e) => {
        const NewClas = clasOrder === 'default' ? 'active' : 'default';
        setClasOrder(NewClas)
    };


    return (
        <div className="account">
            <div className="side-menu">
                <div className="top-menu">
                    <h1 className="font-gramatika-bold">{t("account.account")}</h1>
                    <h2>Varvara Talankina</h2>
                    <div className="side-btn">
                        <a href="/account"><button><img src="../../IMG/icons8-home-96.png" alt="home" />{t("account.my_account")}</button></a>
                        <div className={clasProfile}>
                            <button onClick={HandleDropMenuProfile}><img src="../../IMG/icons8-user-96.png" alt="profile" />{t("account.profile")}</button>
                            <div className="account-drop">
                                <a href="/account">{t("account.personal")}</a>
                                <a href="/account">{t("account.addresses")}</a>
                                <a href="/account">{t("account.cards")}</a>
                                <a href="/account">{t("account.preferences")}</a>
                            </div>
                        </div>

                        <div className={clasOrder}>
                            <button onClick={HandleDropMenuOrder}><img src="../../IMG/icons8-картонная-коробка-100.png" alt="orders" />{t("account.orders")}</button>
                            <div className="account-drop">
                                <a href="/account">{t("account.details")}</a>
                            </div>
                        </div>

                        <a href="/account"><button><img src="../../IMG/icons8-закладка-100.png" alt="wishlist" />{t("account.wishlist")}</button></a>

                    </div>
                </div>
                <a href="/account" className="log-out"><button><img src="../../IMG/icons8-выход-100.png" alt="log-out" />{t("account.log_out")}</button></a>
            </div>
            <div className="account-content">
                {/* <MyAccount/> */}
                {/* <Personal /> */}
            </div>
        </div>
    )
};

export default Account;