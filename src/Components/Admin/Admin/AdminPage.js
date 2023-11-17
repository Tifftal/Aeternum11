import React, { useState } from "react";
import SideBarAdmin from "../SideBarAdmin/SideBarAdmin";
import Tab from "../Tab/Tab";
import "./AdminPage.css"

const AdminPage = () => {
    const [tab, setTab] = useState("");

    return (
        <div className="adminPage">
            <div style={{ margin: "0 0 0 30px", marginBottom: "3%", width: "18%" }}>
                <SideBarAdmin setTab={setTab} tab={tab} />
            </div>
            <div style={{ margin: "0 30px", marginBottom: "3%", width: "82%" }}>
                <Tab tab={tab} />
            </div>
        </div>
    )
}

export default AdminPage;