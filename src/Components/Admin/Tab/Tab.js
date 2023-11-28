import React from "react";
import MainPageAdmin from "../MainPage/MainPage";
import AdminNavbar from "../Navbar/Navbar";
import Goods from "../Goods/Goods";

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
                <Goods />
            );
        default:
            return (
                <MainPageAdmin />
            );
    }
}

export default Tab;