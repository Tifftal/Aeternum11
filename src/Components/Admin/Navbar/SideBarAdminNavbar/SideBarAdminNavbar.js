import React, { useState } from "react";
import './SideBarAdminNavbar.css'

const SideBarAdminNavbar = (props) => {

    return (
        <div className="navbarSideBar">
            <button
                className={props.tabNavbar === "Women" ? "active" : ""}
                onClick={() => { props.setTabNavbar("Women") }}
            >
                Women
            </button>
            <button
                className={props.tabNavbar === "All Gender" ? "active" : ""}
                onClick={() => { props.setTabNavbar("All Gender") }}
            >
                All Gender
            </button>
        </div>
    )
}

export default SideBarAdminNavbar;
