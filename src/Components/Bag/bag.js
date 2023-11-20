import React, { useState, useEffect } from "react";
import "./bag.css"
import { useTranslation } from "react-i18next";
import Card from "./card";
import api from "../../api/axiosConfig";
import { URI } from "../../api/config";

const Bag = () => {
    const [t] = useTranslation("global");
    const [bag, setBag] = useState([]);

    // useEffect(() => {
    //     api.get(`${URI}/user/me`,
    //         {
    //             headers: {
    //                 "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
    //             }
    //         })
    //         .then(response => {
    //             console.log(response);
    //             const goods = [...response.data.bag];
    //             let goodsInBag = [];
    //             goods.map(good => {
    //                 api.get(`${URI}/good/${good.goodId}`, {
    //                     headers: {
    //                         "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
    //                     }
    //                 })
    //                     .then(response => {
    //                         goodsInBag.push(response.data);
    //                         setBag(goodsInBag);
    //                         console.log(goodsInBag);
    //                     })
    //             })
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         })
    // }, [])
    useEffect(() => {
        api.get(`${URI}/user/me`, {
          headers: {
            "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
          }
        })
          .then(response => {
            const goods = [...response.data.bag];
            const fetchGoodPromises = goods.map(good => {
              return api.get(`${URI}/good/${good.goodId}`, {
                headers: {
                  "Authorization": `Bearer ${window.localStorage.getItem("jwtToken")}`
                }
              })
                .then(response => response.data)
            });
      
            return Promise.all(fetchGoodPromises);
          })
          .then(goodsInBag => {
            setBag(goodsInBag);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
      

    return (
        <div className="bag">
            <div className="sale">
                {
                    bag.map(good => (
                        <Card good={good} goods={bag}/>
                    ))
                }
            </div>
            <div className="total">
                <h1 className="font-gramatika-bold">{t("bag.summary")}</h1>
                <div className="purchase">
                    <div>
                        <p>{t("bag.subtotal")}</p>
                        <p>€2.650.00</p>
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
                        <p>€2.650.00</p>
                    </div>
                </div>
                <div className="promo">
                    <input placeholder="Promo Code" />
                </div>
                <button className="font-gramatika-bold">{t("bag.continue")}</button>
            </div>
        </div>
    )
}

export default Bag;