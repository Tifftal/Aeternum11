import React, { useState, useEffect } from "react";
import "./bag.css";
import { useTranslation } from "react-i18next";
import Card from "./card";
import api from "../../api/axiosConfig";
import { URI } from "../../api/config";

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
        // Update the state by removing the deleted item
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
                        data: {
                            clientComment: address,
                        },
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
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
                    <Card key={good.id} good={good} onDelete={handleDeleteCard} />
                ))}
            </div>
            <div className="total">
                <h1 className="font-gramatika-bold">{t("bag.summary")}</h1>
                <div className="purchase">
                    <div>
                        <p>{t("bag.subtotal")}</p>
                        <p>₽ {cost}</p>
                    </div>
                    <div>
                        <p>{t("bag.shipping")}</p>
                        <p>Free</p>
                    </div>
                    <div>
                        <p>Est. Sales Tax</p>
                        <p>Included</p>
                    </div>
                    <div>
                        <p>{t("bag.total")}</p>
                        <p>₽ {cost}</p>
                    </div>
                </div>
                <div className="promo">
                    <input placeholder="Address" onChange={(e) => handleChangeAddress(e)} />
                </div>
                {error ? (
                    <p style={{ color: "red" }} className="font-gramatika-bold">
                        Укажите адрес
                    </p>
                ) : null}
                <button className="font-gramatika-bold" type="submit" onClick={submitForm}>
                    {t("bag.continue")}
                </button>
            </div>
        </div>
    );
};

export default Bag;
