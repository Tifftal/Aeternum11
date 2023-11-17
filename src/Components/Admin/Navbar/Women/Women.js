import React, { useState } from "react";
import './Women.css';
import { useTranslation } from "react-i18next";

const Women = () => {
    const [t] = useTranslation("global");

    return (
        <div className="womenAdmin">
            <div className="col-admin">
                <h1>{t("drop.women.title1")}</h1>
                <p>{t("drop.women.el")}<button>×</button></p>
                <p>{t("drop.women.el")}<button>×</button></p>
                <p>{t("drop.women.el")}<button>×</button></p>
                <p>{t("drop.women.el")}<button>×</button></p>
                <button style={{marginTop: 15, backgroundColor: "#314728"}}>+</button>
            </div>
            <div className="col-admin">
                <h1>{t("drop.women.title2")}</h1>
                <p>{t("drop.women.el")}<button>×</button></p>
                <p>{t("drop.women.el")}<button>×</button></p>
                <p>{t("drop.women.el")}<button>×</button></p>
                <button style={{marginTop: 15, backgroundColor: "#314728"}}>+</button>
            </div>
            <div className="col-admin">
            <button style={{marginTop: 15, backgroundColor: "#314728"}}>+</button>
            </div>
        </div>
    )
}

export default Women;
