import React from "react";
import Women from "../Women/Women";
import AllGender from "../AllGender/AllGender";

const TabNavbar = (props) => {
    switch (props.tabNavbar) {
        case "Women":
            return (
                <Women />
            );
        case "All Gender":
            return (
                <AllGender />
            );
        default:
            return (
                <Women />
            );
    }
}

export default TabNavbar;