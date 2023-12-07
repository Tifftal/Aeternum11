import React, { useEffect, useState } from "react";
import "./third.css"
import { useTranslation } from "react-i18next";
import api from "../../../api/axiosConfig";
import { URI } from "../../../api/config";

const Third = () => {
    const [t] = useTranslation("global");
    const [data, setData] = useState();

    useEffect(() => {
        api.get(`${URI}/firstPage`)
            .then(response => {
                console.log(response)
                // let categoriesId = [];
                // const sections = response.data;
                // // eslint-disable-next-line
                // sections.map(categories => {
                
                //     categoriesId = [...categories.categories]
                // })
                // console.log("CATEGORIES", categoriesId)
                // setCategories(categoriesId)
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <div className="third">
            <div className="poster">
                <div className="posterImg">
                </div>
                <div className="posterInfo font-gramatika-bold">
                    <h2>рекомендуем</h2>
                    <h1 className="font-gramatika-bold">Lorem ipsum dolor</h1>
                    <p className="font-gramatika-reg">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    <a href="/"><button className="font-gramatika-bold">узнать больше</button></a>
                </div>
            </div>
        </div>
    )
}

export default Third;