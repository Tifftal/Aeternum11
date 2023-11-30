import React, { useEffect, useState } from "react";
import './Address.css';
import { useTranslation } from "react-i18next";
import api from "../../../../api/axiosConfig";
import { URI } from "../../../../api/config";

const Address = () => {
    const [t] = useTranslation("global");
    const [content, setContent] = useState([]);
    const [user, setUser] = useState();

    const formatTime = (timeString) => {
        const months = [
            "Января",
            "Февраля",
            "Марта",
            "Апреля",
            "Мая",
            "Июня",
            "Июля",
            "Августа",
            "Сентября",
            "Октября",
            "Ноября",
            "Декабря",
        ];

        const date = new Date(timeString);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${day} ${months[month]} ${year} ${hours}:${formattedMinutes}`;
    };

    useEffect(() => {
        api.get(`${URI}/application`, {
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
            }
        })
            .then(response => {
                setContent(response.data.content);
                console.log(response.data.content);

                api.get(`${URI}/user/me`, {
                    headers: {
                        "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
                    }
                })
                    .then(response => {
                        console.log(response.data);
                        setUser(response.data)
                    })

            })
    }, [])

    const getStatusColor = (status) => {
        switch (status) {
            case "FREE":
                return "RoyalBlue";
            case "DENIED":
                return "FireBrick";
            case "ACCESSED":
                return "OliveDrab";
            default:
                return "gray"; // Цвет по умолчанию или любой другой цвет
        }
    };

    return (
        <div className="address">
            <h1 className="font-gramatika-bold">Ваши заказы</h1>
            <div className="order-cards-self">
                {
                    content.map(order => (

                        <div className="cardOrderSelf" key={order.id}>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                <h2 className="font-gramatika-bold">Заказ №{order.id}   <b style={{ color: getStatusColor(order.status), marginLeft: "10px" }}>{order.status}</b></h2>
                            </div>
                            <h3> <b>Дата заказа:</b>  {formatTime(order.time)}</h3>
                            <table className='goods-in-order-self'>
                                <thead>
                                    <tr>
                                        <th style={{ width: "45%" }}>Название</th>
                                        <th style={{ width: "20%" }}>Цвет</th>
                                        <th style={{ width: "20%" }}>Размер</th>
                                        <th style={{ width: "15%" }}>Кол-во</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td style={{ width: "45%" }}>name</td>
                                        <td style={{ width: "20%" }}>color</td>
                                        <td style={{ width: "20%" }}>size</td>
                                        <td style={{ width: "15%" }}>amount</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                    ))
                }

            </div>

        </div>
    )
}
export default Address;