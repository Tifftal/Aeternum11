import React, { useEffect, useState } from "react";
import './Address.css';
import api from "../../../../api/axiosConfig";
import { URI } from "../../../../api/config";

const Address = () => {
    const [content, setContent] = useState([]);
    const [goods, setGoods] = useState([]);

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
                const orders = response.data.content;

                api.get(`${URI}/user/me`, {
                    headers: {
                        "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
                    }
                })
                    .then(() => {
                        
                    })
                    .catch(error => {
                        console.error(error);
                    });

                const goodsPromises = orders.flatMap(order =>
                    order.items.map(item =>
                        api.get(`${URI}/good/${item.goodId}`, {
                            headers: {
                                "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
                            }
                        })
                            .then(response => response.data.name)
                            .catch(error => {
                                console.error(error);
                                return null;
                            })
                    )
                );

                Promise.all(goodsPromises)
                    .then(goods => setGoods(goods))
                    .catch(error => {
                        console.error(error);
                        setGoods([]);
                    });
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

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

    const getStatusName = (name) => {
        switch (name) {
            case "FREE":
                return "В обработке";
            case "DENIED":
                return "Отменен";
            case "ACCESSED":
                return "Завершён";
            default:
                return "gray"; // Цвет по умолчанию или любой другой цвет
        }
    };

    return (
        <div className="address">
        <div style={{marginLeft: "auto", marginRight:"auto"}}>
            <h1 className="font-gramatika-bold">Ваши заказы</h1>
        </div>
            <div className="order-cards-self">
            {content.length === 0 ? (
                
            <div className="empty-bag">
                <p>Ваши заказы пусты</p>
                <a href="/catalog"><button className="font-gramatika-bold">Перейти в каталог</button></a>
            </div>
            ) : (content.map((order, index) => (
                    <div className="cardOrderSelf" key={order.id}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <h2 className="font-gramatika-bold">Заказ №{order.id}   <b style={{ color: getStatusColor(order.status), marginLeft: "10px" }}>{getStatusName(order.status)}</b></h2>
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
                                {order.items.map((good, itemIndex) => (
                                    <tr key={itemIndex}>
                                        <td style={{ width: "45%" }}>{goods[itemIndex] || "Недоступно"}</td>
                                        <td style={{ width: "20%" }}>{good.colorName}</td>
                                        <td style={{ width: "20%" }}>{good.size}</td>
                                        <td style={{ width: "15%" }}>{good.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            )))
            }
            </div>
        </div>
    );
};

export default Address;
