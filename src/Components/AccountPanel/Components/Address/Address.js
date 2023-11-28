import React, { useEffect, useState } from "react";
import './Address.css';
import { useTranslation } from "react-i18next";
import api from "../../../../api/axiosConfig";
import { URI } from "../../../../api/config";

const Address = () => {
    const [t] = useTranslation("global");
    const [content, setContent] = useState([]);

    useEffect(() => {
        api.get(`${URI}/application`, {
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
            }
        })
        .then(response => {
            setContent(response.data);

        })
    })

    return (
        <div className="address">
            <h1>Ваши заказы</h1>

        </div>
    )
}
export default Address;