import React from "react";
import "./createAccount.css";
import { useTranslation } from "react-i18next";

const CreateAccount = () => {
    const [t] = useTranslation("global");

    return (
        <div className="account">
            <h2>{t("create_account.title1")}</h2>
            <h1>{t("create_account.title2")}</h1>
            <p>{t("create_account.text1")}</p>

            <div className="registration">
                <input type="text" placeholder={t("create_account.first_name")} />
                <input type="text" placeholder={t("create_account.last_name")} />
                <input type="text" placeholder={t("create_account.gender")} />
                <input type="text" placeholder={t("create_account.date")} />
                <input type="text" placeholder={t("create_account.country")} />
                <input type="text" placeholder={t("create_account.state")} />
                <input type="text" placeholder={t("create_account.sity")} />
                <input type="text" placeholder={t("create_account.phone")} />
            </div>
            <div className="reg">
                <input type="text" placeholder={t("create_account.email")} />
                <input type="password" placeholder={t("create_account.password")} />
                <input type="password" placeholder={t("create_account.confirm")} />
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

            <a className="BtnAc" href="/"><button>{t("create_account.create")}</button></a>
        </div>
    )
}

export default CreateAccount;