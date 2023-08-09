import React from "react";
import "./fourth.css";
import { useTranslation } from "react-i18next";

const Fourth = () => {
    const [t] = useTranslation("global");
    return (
        <div className="fourth">
            <div className="fourthInfo">
                {t("fourth.info")}
            </div>
            <div className="NewSt">
                <h1>{t("fourth.title")}</h1>
                <p>{t("fourth.text")}</p>
                <div className="emailForm">
                    <input className="email" type="email" id="email" name="email" placeholder={t("fourth.email")} />
                    <p>{t("fourth.please")}</p>
                    <div className="chooseGender">
                        <div className="gender" >
                            <input type="checkbox" />
                            <label>{t("fourth.women")}</label>
                        </div>
                        <div className="gender" >
                            <input type="checkbox" />
                            <label>{t("fourth.men")}</label>
                        </div>
                        <div className="gender" >
                            <input type="checkbox" />
                            <label>{t("fourth.none-binary")}</label>
                        </div>
                    </div>
                    <div className="agree">
                        <input type="checkbox" />
                        <label>{t("fourth.agree")}</label>
                    </div>
                    <a className="BtnSb" href="/"><button>{t("fourth.subscribe")}</button></a>

                    {/* <input className="email test" type="email" id="email" name="email" placeholder={t("fourth.email")} /> */}
                </div>
            </div>
        </div>
    )
}

export default Fourth;