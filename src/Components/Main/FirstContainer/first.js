import React, { useEffect, useState } from "react";
import './first.css';
import { useTranslation } from "react-i18next";
import api from "../../../api/axiosConfig";
import { Minio, URI } from "../../../api/config";

const First = () => {
    const [bg, setBg] = useState('');

    useEffect(() => {
        const updateBackgroundImage = async () => {
            try {
                const response = await api.get(`${URI}/background`);
                const backgroundImageUrl = `${Minio}/${response.data.path}`;
                setBg(backgroundImageUrl);
            } catch (err) {
                console.error(err);
            }
        };

        updateBackgroundImage();
    }, []);

    return (
        <div className="first" style={{ backgroundImage: `url(${bg})` }}>
            <div className="text font-gramatika-reg">
                <p>
                    Aeternum Eleven – экологически сознательный бренд доступной роскоши.
                </p>
                <p>
                    Альтернативная вселенная, в которой творчество, образ и жизнь человека сосуществуют органично с окружающей средой.
                </p>
                <a className="BtnCatalog font-gramatika-bold" href="/catalog"><button>каталог</button></a>
            </div>
            <div className="image">
                <img src="../../IMG/Group 69.png" alt="Logo" />
            </div>
        </div>
    );
}

export default First;
