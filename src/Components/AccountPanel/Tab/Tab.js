import React from "react";
import Personal from "../Components/PersInf/personal";
import Address from "../Components/Address/Address";

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
                <Address />
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