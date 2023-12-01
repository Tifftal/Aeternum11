import React, { useState, useEffect } from "react";
import Tab from "../Tab/Tab";
import "./Account.css"
import { useTranslation } from "react-i18next";
import SideBarAccount from "../SideBarAccount/SideBarAccount";
import axios from "axios";
import { URI } from "../../../api/config";
import api from "../../../api/axiosConfig";

const Account = () => {
    const [t] = useTranslation("global");
    const [tab, setTab] = useState("");
    const [user, setUser] = useState({});

    useEffect(() => {
        api.get(`${URI}/user/me`,
        {
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
            }
        })
        .then(response => {
            console.log(response.data)
            if (response.status === 200) {
                setUser(response.data);
            }
        })
        .catch(error => {
            console.error(error);
        })
    }, [])

    return (
        <div className="adminPage">
            <div className="div1">
                <SideBarAccount setTab={setTab} tab={tab} user={user}/>
            </div>
            <div className="div2">
                <Tab tab={tab}/>
            </div>
        </div>
    )
}

export default Account;