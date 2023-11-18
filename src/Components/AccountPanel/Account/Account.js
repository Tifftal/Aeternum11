import React, { useState } from "react";
import Tab from "../Tab/Tab";
import "./Account.css"
import { useTranslation } from "react-i18next";
import SideBarAccount from "../SideBarAccount/SideBarAccount";

const Account = () => {
    const [t] = useTranslation("global");
    const [tab, setTab] = useState("");

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