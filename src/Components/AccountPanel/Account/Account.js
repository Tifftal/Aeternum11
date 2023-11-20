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

    useEffect(() => {
        api.get(`${URI}/user/me`)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        })
    })

    return (
        <div className="adminPage">
            <div style={{ margin: "0 0 0 30px", marginBottom: "3%", width: "18%" }}>
                <SideBarAccount setTab={setTab} tab={tab} />
            </div>
            <div style={{ margin: "0 30px", marginBottom: "3%", width: "82%" }}>
                <Tab tab={tab} />
            </div>
        </div>
    )
}

export default Account;