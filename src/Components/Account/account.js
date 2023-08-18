import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./account.css";
import MyAccount from "./My Account/myAccount";
import Personal from "./PersInf/personal";

const Account = () => {

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
                    <h1>account</h1>
                    <h2>Varvara Talankina</h2>
                    <div className="side-btn">
                        <a href="/account"><button><img src="../../IMG/icons8-home-96.png" alt="home" />My Account</button></a>
                        <div className={clasProfile}>
                            <button onClick={HandleDropMenuProfile}><img src="../../IMG/icons8-user-96.png" alt="profile" />Profile</button>
                            <div className="account-drop">
                                <a href="/account">Personal Information</a>
                                <a href="/account">Addresses</a>
                                <a href="/account">Registered Cards</a>
                                <a href="/account">Preferences</a>
                            </div>
                        </div>

                        <div className={clasOrder}>
                            <button onClick={HandleDropMenuOrder}><img src="../../IMG/icons8-картонная-коробка-100.png" alt="orders" />Orders</button>
                            <div className="account-drop">
                                <a href="/account">Order Details</a>
                            </div>
                        </div>

                        <a href="/account"><button><img src="../../IMG/icons8-закладка-100.png" alt="wishlist" />Wishlist</button></a>

                    </div>
                </div>
                <a href="/account" className="log-out"><button><img src="../../IMG/icons8-выход-100.png" alt="log-out" />Log out</button></a>
            </div>
            <div className="account-content">
                {/* <MyAccount/> */}
                {/* <Personal /> */}
            </div>
        </div>
    )
};

export default Account;