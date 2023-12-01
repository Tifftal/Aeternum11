import React, { useState, useEffect } from "react";
import "./bag.css";
import { useTranslation } from "react-i18next";
import api from "../../api/axiosConfig";
import { URI } from "../../api/config";
import CardBag from "./card";

const Bag = () => {
    const [t] = useTranslation("global");
    const [myBag, setMyBag] = useState([]);
    const [cost, setCost] = useState(0);
    const [address, setAddress] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        api
            .get(`${URI}/user/me`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                },
            })
            .then((response) => {
                setMyBag(response.data.bag);
                console.log(response.data.bag)
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        let summary = 0;
        myBag.forEach((bag) => {
            api
                .get(`${URI}/good/${bag.goodId}`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                    },
                })
                .then((response) => {
                    summary += response.data.cost;
                    setCost(summary);
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }, [myBag]);

    const handleChangeAddress = (e) => {
        const newAddress = e.target.value;
        setAddress(newAddress);
    };

    const handleDeleteCard = (bagId) => {
        setMyBag((prevBag) => prevBag.filter((item) => item.id !== bagId));
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (address === "") {
            setError(true);
        } else {
            setError(false);
            api
                .post(
                    `${URI}/application`,
                    {

                        clientComment: address,

                    },
                    {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    setMyBag([])
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <div className="bag">

            <div className="sale">
                {myBag.map((good) => (
                    <CardBag key={good.id} good={good} onDelete={handleDeleteCard} />
                ))}
            </div>

            <div className="total">
                <h1 className="font-gramatika-bold">заказ</h1>
                <div className="purchase">
                    <div>
                        <p>Цена</p>
                        <p>{cost} ₽ </p>
                    </div>
                    <div>
                        <p>Доставка</p>
                        <p>Free</p>
                    </div>
                    <div>
                        <p>Налоговый сбор</p>
                        <p>Included</p>
                    </div>
                    <div>
                        <p>Всего</p>
                        <p>{cost} ₽ </p>
                    </div>
                </div>
                <div className="promo">
                    <input placeholder="Адрес" onChange={(e) => handleChangeAddress(e)} />
                </div>
                {error ? (
                    <p style={{ color: "red" }} className="font-gramatika-bold">
                        Укажите адрес
                    </p>
                ) : null}
                <button className="font-gramatika-bold" type="submit" onClick={submitForm}>
                    Продолжить
                </button>
            </div>
        </div>
    );
};

export default Bag;
