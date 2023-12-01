import React from "react";
import './first.css';
import { useTranslation } from "react-i18next";

const First = () => {
    const [t] = useTranslation("global");

    return (
        <div className="first">
            <div className="text">
                <p>
                    Aeternum Eleven – экологически сознательный бренд доступной роскоши.
                </p>
                <p>
                    Альтернативная вселенная, в которой творчество, образ и жизнь человека сосуществуют органично с окружающей средой.
                </p>
                <a className="BtnCatalog font-gramatika-bold" href="/catalog" ><button>каталог</button></a>
            </div>
            <div className="image">
                <img src="../../IMG/Group 69.png" alt="Logo" />
            </div>
        </div>
    )
}

export default First;