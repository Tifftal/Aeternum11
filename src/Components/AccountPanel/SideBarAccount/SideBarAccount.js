import React, { useState, useEffect } from "react";
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

    useEffect(() => {
        if (window.localStorage.getItem("account") === "account") {
            props.setTab("Personal");
        } else {
            props.setTab("Order")
        }
    }, [])

    return (
        <div className="accountSideBar">
            <div>
                <h1 className="font-gramatika-bold">аккаунт</h1>
                <h2 className="font-gramatika-reg">{props.user.firstName} {props.user.lastName}</h2>
                <div className={clasProfile}>
                    <button className="default font-gramatika-reg" style={{cursor: "pointer"}} onClick={HandleDropMenuProfile}><img src="../../IMG/icons8-user-96.png" alt="profile" />Профиль</button>
                    <div className="account-drop">
                        <button
                        style={{cursor: "pointer"}}
                            className={props.tab === "Personal" ? "active_drop font-gramatika-reg" : "default_drop font-gramatika-reg"}
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
                    <button className="default font-gramatika-reg" style={{cursor: "pointer"}} onClick={HandleDropMenuOrder}><img src="../../IMG/icons8-картонная-коробка-100.png" alt="orders" />Заказы</button>
                    <div className="account-drop">
                        <button
                        style={{cursor: "pointer"}}
                            className={props.tab === "Order" ? "active_drop font-gramatika-reg" : "default_drop font-gramatika-reg"}
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
                    className="default font-gramatika-reg"
                    onClick={
                        () => {
                            localStorage.removeItem("jwtToken");
                            window.location.href = "/"
                        }
                    }
                >
                    <img src="../../IMG/icons8-выход-100.png" alt="wishlist"
                    />Выход
                </button>
            </div>

        </div>
    )
}

export default SideBarAccount;
