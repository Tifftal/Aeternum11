import React, { useState, useEffect } from "react";
import './Orders.css';
import OrderDetail from "./OrderDetails/OrderDetails";
import { URI } from "../../../api/config";
import api from "../../../api/axiosConfig";

const Orders = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [data, setData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");

    const status = ["FREE", "DENIED", "ACCESSED"]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`${URI}/application/admin`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                    },
                });

                

                const data = response.data.content;

                const promises = data.map(order => {
                    return api.get(`${URI}/user/${order.userId}`, {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                        },
                    });
                });

                const usersData = await Promise.all(promises);
                

                setData(
                    data.map((order, index) => {
                        return {
                            ...order,
                            userData: usersData[index].data,
                        };
                    })
                );
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []); // Пустой массив зависимостей указывает на то, что эффект должен выполняться только при монтировании компонента

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

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${day} ${months[month]} ${year} ${hours}:${formattedMinutes}`;
    };


    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        setSelectedStatus((prev) => (prev === value ? "" : value));
    };

    const filteredData = data.filter((order) => {
        if (selectedStatus.length > 0) {
            return order.status === selectedStatus;
        }
        return true; // Если фильтр не установлен, отображаем все заказы
    });

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

    const handleOrderUpdate = async () => {
        try {
            const response = await api.get(`${URI}/application/admin`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                },
            });

            

            const data = response.data.content;

            const promises = data.map((order) => {
                return api.get(`${URI}/user/${order.userId}`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                    },
                });
            });

            const usersData = await Promise.all(promises);
            

            setData(
                data.map((order, index) => {
                    return {
                        ...order,
                        userData: usersData[index].data,
                    };
                })
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="orders">
            {isOpen && (
                <OrderDetail
                    onClose={handleCloseNote}
                    setIsOpen={setIsOpen}
                    width="50vw"
                    order={selectedOrder}
                    formatTime={formatTime}
                    onOrderUpdate={handleOrderUpdate}
                />
            )}
            <div className="order-cards">
                {filteredData.map((order) => (
                    <div className="cardOrder" onClick={() => handleOpenNote(order)} key={order.id}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <h2 className="font-gramatika-bold">Заказ №{order.id}   <b style={{ color: getStatusColor(order.status), marginLeft: "10px" }}>{order.status}</b></h2>
                            <p style={{ color: "gray" }}>{order.adminComment}</p>
                        </div>
                        <h3> <b>Дата заказа:</b>  {formatTime(order.time)}</h3>
                        <p>ФИО: {order.userId && order.userData && `${order.userData.firstName} ${order.userData.lastName}`}</p>
                        <p>Адрес: {order.userId && order.userData && `${order.clientComment}`}</p>
                    </div>
                ))}
            </div>
            <form className="order-filter">
                {status.map((status) => (
                    <div key={status} style={{ marginBottom: "5px" }}>
                        <input
                            type="radio"
                            id={status}
                            value={status}
                            checked={selectedStatus === status}
                            onChange={handleCheckboxChange}
                            style={{ marginRight: "7px", transform: "scale(1.2)" }}
                        />
                        <label htmlFor={status}>{status}</label>
                    </div>
                ))}
                <button className='filterBtn' type="button" onClick={() => setSelectedStatus('')}>
                    Сбросить
                </button>
            </form>
        </div>
    );
};

export default Orders;
