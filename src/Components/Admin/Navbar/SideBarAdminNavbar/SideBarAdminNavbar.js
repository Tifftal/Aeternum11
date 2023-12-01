import React, { useState } from "react";
import './SideBarAdminNavbar.css'

const SideBarAdminNavbar = (props) => {

    return (
        <div className="navbarSideBar">
            <button
                className="activeNavBtn"
                onClick={() => { props.setTabNavbar("Women") }}
            >
                Женщины
            </button>
            {/* <button
                className={props.tabNavbar === "All Gender" ? "active" : ""}
                onClick={() => { props.setTabNavbar("All Gender") }}
            >
                All Gender
            </button> */}
        </div>
    )
}

export default SideBarAdminNavbar;
