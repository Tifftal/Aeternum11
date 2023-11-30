import React, { useEffect, useState } from 'react';
import './OrderDetails.css';
import { useTranslation } from 'react-i18next';
import api from '../../../../api/axiosConfig';
import { URI } from '../../../../api/config';

const OrderDetail = ({ onClose, width, order, formatTime, onOrderUpdate }) => {
    const [t] = useTranslation('global');
    const [goodsData, setGoodsData] = useState([]);

    useEffect(() => {
        const fetchGoodsData = async () => {
            const promises = order.items.map(good => {
                return api.get(`${URI}/good/${good.id}`)
                    .then(response => response.data)
                    .catch(error => {
                        console.error(error);
                        return null;
                    });
            });

            const goodsData = await Promise.all(promises);
            setGoodsData(goodsData);
        };

        fetchGoodsData();
    }, [order.items]);

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

    const ChangeStatus = (comment, status) => {
        api.put(`${URI}/application/${order.id}`,
            {
                adminComment: comment,
                status: status
            },
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                },
            }
        )
            .then(response => {
                console.log(response);
                onClose();
                onOrderUpdate();
            })
            .catch(err => {
                console.error(err);
            });
    }


    return (
        <div className="modal">
            <div className="modal-content-edit" style={{ width }}>
                <div style={{ marginBottom: "2%" }} className='header-good font-gramatika-bold'>
                    <h1>Информация о заказе</h1>
                    <button className='close' onClick={onClose}><img src='../../IMG/icons8-крестик-78.png' alt='close' /></button>
                </div>
                <div className='order-info'>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <h2 className="font-gramatika-bold">Заказ №{order.id}  <b style={{ color: getStatusColor(order.status), marginLeft: "10px", backgroundColor: "white", padding: "2px 6px", borderRadius: "3px" }}>{order.status}</b></h2>
                        <p style={{ color: "WhiteSmoke", display: "flex", flexDirection: "row", alignItems: "center" }}>Комментарий админа: {order.adminComment}</p>
                    </div>
                    <h3> <b>Дата заказа:</b>  {formatTime(order.time)}</h3>
                    {order.status === "FREE" &&
                        <div className='statusBtn'>
                            <button
                                style={{ backgroundColor: "FireBrick" }}
                                onClick={() => {
                                    const reason = window.prompt("Комментарий админа:");
                                    if (reason) {
                                        console.log("Коммент админа:", reason);
                                        ChangeStatus(reason, "DENIED");
                                    } else {
                                        console.log("Отклонение отменено");
                                    }
                                }}
                            >
                                Отклонить</button>
                            <button
                                style={{ backgroundColor: "OliveDrab" }}
                                onClick={() => {
                                    const reason = window.prompt("Комментарий админа:");
                                    if (reason) {
                                        console.log("Коммент админа:", reason);
                                        ChangeStatus(reason, "ACCESSED");
                                    } else {
                                        console.log("Подтверждение отменено");
                                    }
                                }}
                            >
                                Подтвердить</button>
                        </div>}
                    <p>ФИО: {order.userId && order.userData && `${order.userData.firstName} ${order.userData.lastName}`}</p>
                    <p>Телефон: {order.userId && order.userData && `${order.userData.phone}`}</p>
                    <div className='address-in-order'>
                        <p>Страна: {order.userId && order.userData && `${order.userData.country}`}</p>
                        <p>Регион: {order.userId && order.userData && `${order.userData.state}`}</p>
                        <p>Город:</p>
                    </div>
                    <p>Адрес заказа:</p>

                    <table className='goods-in-order'>
                        <thead>
                            <tr>
                                <th style={{ width: "45%" }}>Название</th>
                                <th style={{ width: "20%" }}>Цвет</th>
                                <th style={{ width: "20%" }}>Размер</th>
                                <th style={{ width: "15%" }}>Кол-во</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((good, index) => {
                                const goodData = goodsData[index] || {}; // Данные о товаре по умолчанию пустые

                                return (
                                    <tr key={index}>
                                        <td style={{ width: "45%" }}>{goodData.name || "Недоступно"}</td>
                                        <td style={{ width: "20%" }}>{good.colorName}</td>
                                        <td style={{ width: "20%" }}>{good.size}</td>
                                        <td style={{ width: "15%" }}>{good.amount}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
