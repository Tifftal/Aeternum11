import React from "react";
import Personal from "../Components/PersInf/personal";

const Tab = (props) => {
    switch (props.tab) {
        case "Goods":
            return (
                props.tab
            );
        case "Personal":
            return (
                <Personal />
            );
        case "Cards":
            return (
                props.tab
            );
        case "Addresses":
            return (
                props.tab
            );
        case "Preferences":
            return (
                props.tab
            );
        case "Order":
            return (
                props.tab
            );
        default:
            return (
                <Personal />
            );
    }
}

export default Tab;