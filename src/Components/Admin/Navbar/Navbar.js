import React, { useState } from "react";
import './Navbar.css'
import SideBarAdminNavbar from "./SideBarAdminNavbar/SideBarAdminNavbar";
import TabNavbar from "./TabNavbar/TabNavbar";

const AdminNavbar = () => {
    const [tabNavbar, setTabNavbar] = useState("");

    return (
        <div className="adminNavbar">
            <div style={{ margin: "0 10px 20px 0"}}>
                <SideBarAdminNavbar setTabNavbar={setTabNavbar} tabNavbar={tabNavbar} />
            </div>
            <div style={{ margin: "0 0 0 10px" }}>
                <TabNavbar tabNavbar={tabNavbar} />
            </div>
        </div>
    )
}

export default AdminNavbar;
