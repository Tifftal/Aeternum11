import React from "react";
import MainPageAdmin from "../MainPage/MainPage";
import AdminNavbar from "../Navbar/Navbar";

const Tab = (props) => {
    switch (props.tab) {
        case "MainPage":
            return (
                <MainPageAdmin />
            );
        case "Navbar":
            return (
                <AdminNavbar />
            );
        case "Goods":
            return (
                props.tab
            );
        default:
            return (
                <MainPageAdmin />
            );
    }
}

export default Tab;