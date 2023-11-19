import React from "react";
import './personal.css';
import { useTranslation } from "react-i18next";

const Personal = () => {
    const [t] = useTranslation("global");
    return (
        <div className="pers">
            <h2 className="font-gramatika-bold">{t("create_account.title1")}</h2>
            <h1>Join Aeternum Eleven</h1>

            <div className="pers-data">
                <input type="text" placeholder={t("create_account.first_name")} />
                <input type="text" placeholder={t("create_account.last_name")} />
                <input type="text" placeholder={t("create_account.gender")} />
                <input type="text" placeholder={t("create_account.date")} />
                <input type="text" placeholder={t("create_account.country")} />
                <input type="text" placeholder={t("create_account.state")} />
                <input type="text" placeholder={t("create_account.city")} />
                <input type="text" placeholder={t("create_account.phone")} />
            </div>            
            <h3>{t("create_account.*")}</h3>
            <h4>{t("create_account.text2")}</h4>
            <div className="agreeAc">
                <input type="checkbox" />
                <label>{t("create_account.check1")}</label>
            </div>
            <div className="agreeAc">
                <input type="checkbox" />
                <label>{t("create_account.check2")}</label>
            </div>

            <a className="BtnAc" href="/"><button>Update your Information</button></a>
        </div>

    )
}

export default Personal;