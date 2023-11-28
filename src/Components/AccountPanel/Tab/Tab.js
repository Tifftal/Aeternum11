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
        case "Addresses":
            return (
                <Address />
            );
        case "Order":
            return (
                <Address />
            );
        default:
            return (
                <Personal />
            );
    }
}

export default Tab;