import React, { useEffect, useState } from "react";
import './Orders.css'
import OrderDetail from "./OrderDetails/OrderDetails";
import { URI } from "../../../api/config";
import api from "../../../api/axiosConfig";

const Orders = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [data, setData] = useState([]);

    const handleOpenNote = (order) => {
        setIsOpen(true);
        setSelectedOrder(order);
    };

    const handleCloseNote = () => {
        setIsOpen(false);
    };

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

        // Добавим нуль, если минуты меньше 10
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${day} ${months[month]} ${year} ${hours}:${formattedMinutes}`;
    };

    useEffect(() => {
        api.get(`${URI}/application/admin`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
            },
        })
            .then(async response => {
                console.log(response.data.content)
                const data = response.data.content;

                // Создаем массив промисов для всех асинхронных запросов
                const promises = data.map(order => {
                    return api.get(`${URI}/user/${order.userId}`, {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                        },
                    });
                });

                // Выполняем все запросы одновременно
                const usersData = await Promise.all(promises);
                console.log(usersData)

                // Обновляем состояние с данными
                setData(data.map((order, index) => {
                    return {
                        ...order,
                        userData: usersData[index].data, // Добавляем информацию о пользователе в объект заказа
                    };
                }));
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <div className="orders">
            {isOpen && (
                <OrderDetail
                    onClose={handleCloseNote}
                    setIsOpen={setIsOpen}
                    width="50vw"
                    order={selectedOrder}
                    formatTime={formatTime}
                />
            )}
            <div className="order-cards">
                {
                    data.map(order => (
                        <div className="cardOrder" onClick={() => handleOpenNote(order)} key={order.id}>
                            <h2 className="font-gramatika-bold">Заказ №{order.id}  <b style={{ color: "dodgerblue", marginLeft: "10px" }}>{order.status}</b></h2>
                            <h3> <b>Дата заказа:</b>  {formatTime(order.time)}</h3>
                            <p>ФИО: {order.userId && order.userData && `${order.userData.firstName} ${order.userData.lastName}`}</p>
                            <p>Адрес:</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Orders;
