import React, { useState } from "react";
import './SideBarAccount.css';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

const SideBarAccount = (props) => {
    const navigate = useNavigate();

    const HandleOpenWishlist = () => {
        navigate('/wishlist');
    };
    const [t] = useTranslation("global");
    const [clasProfile, setClasProfile] = useState('activeProfile');
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
            <div>
                <h1 className="font-gramatika-bold">аккаунт</h1>
                <h2>{props.user.firstName} {props.user.lastName}</h2>
                <div className={clasProfile}>
                    <button className="default" onClick={HandleDropMenuProfile}><img src="../../IMG/icons8-user-96.png" alt="profile" />Профиль</button>
                    <div className="account-drop">
                        <button
                            className={props.tab === "Personal" ? "active_drop" : "default_drop"}
                            onClick={() => { props.setTab("Personal") }}
                        >
                            Персональные данные
                        </button>
                        {/* <button
                            className={props.tab === "Addresses" ? "active_drop" : "default_drop"}
                            onClick={() => { props.setTab("Addresses") }}
                        >
                            {/* {t("account.addresses")} */}
                        
                    </div>
                </div>
                <div className={clasOrder}>
                    <button className="default" onClick={HandleDropMenuOrder}><img src="../../IMG/icons8-картонная-коробка-100.png" alt="orders" />Заказы</button>
                    <div className="account-drop">
                        <button
                            className={props.tab === "Order" ? "active_drop" : "default_drop"}
                            onClick={() => { props.setTab("Order") }}
                        >
                            Детали заказов
                        </button>
                    </div>
                </div>
                {/* <button
                    className="default"
                    onClick={HandleOpenWishlist}
                >
                    <img src="../../IMG/icons8-закладка-100.png" alt="wishlist" />{t("account.wishlist")}
                </button> */}
            </div>
            <div>
                <button
                    className="default"
                >
                    <img src="../../IMG/icons8-выход-100.png" alt="wishlist" 
                        onClick={
                            () => {
                                localStorage.removeItem("jwtToken");
                                window.location.href = "/"
                            }
                        }
                    />Выход
                </button>
            </div>

        </div>
    )
}

export default SideBarAccount;
