import React, { useEffect, useState } from "react";
import './Orders.css'
import OrderDetail from "./OrderDetails/OrderDetails";
import { URI } from "../../../api/config";
import api from "../../../api/axiosConfig";

const Orders = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');

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

    useEffect(() => {
        api.get(`${URI}/application/admin?status=${query}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
            },
        })
            .then(async response => {
                console.log(response.data.content)
                const data = response.data.content;

                const promises = data.map(order => {
                    return api.get(`${URI}/user/${order.userId}`, {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                        },
                    });
                });

                const usersData = await Promise.all(promises);
                console.log(usersData)

                setData(data.map((order, index) => {
                    return {
                        ...order,
                        userData: usersData[index].data, 
                    };
                }));
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const handleCheckboxChange = (e) => {
        setQuery(e.target.value)
    }

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
            <div className="order-cards">
                <form>
                    <input
                        type="checkbox"
                        id="FREE"
                        value="FREE"
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="FREE">FREE</label>
                </form>
            </div>
        </div>
    )
}

export default Orders;
