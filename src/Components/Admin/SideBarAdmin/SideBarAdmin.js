import React, { useState } from "react";
import './SideBarAdmin.css'

const SideBarAdmin = (props) => {

    return (
        <div className="adminSideBar">
            <button
                className={props.tab === "MainPage" ? "active" : ""}
                onClick={() => { props.setTab("MainPage") }}
            >
                <img src="../IMG/icons8-главная-144.png" />Main Page
            </button>
            <button
                className={props.tab === "Navbar" ? "active" : ""}
                onClick={() => { props.setTab("Navbar") }}
            >
                <img src="../IMG/icons8-меню-150.png" />Navbar
            </button>
            <button
                className={props.tab === "Goods" ? "active" : ""}
                onClick={() => { props.setTab("Goods") }}
            >
                <img src="../IMG/icons8-одежда-96.png" />Goods
            </button>
            <button
                className={props.tab === "Orders" ? "active" : ""}
                onClick={() => { props.setTab("Orders") }}
            >
                <img src="../IMG/icons8-картонная-коробка-100.png" />Goods
            </button>
        </div>
    )
}

export default SideBarAdmin;
