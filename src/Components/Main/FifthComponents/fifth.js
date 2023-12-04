import React from "react";
import "./fifth.css";
import { useTranslation } from "react-i18next";

const Fifth = () => {
    const [t] = useTranslation("global");

    return (
        <div className="fifth">
            {/* <div className="footerMenu">
                <div className="footerDr">
                    <button>
                        {t("fifth.follow us")}
                        <img src="../../IMG/icons8-вниз-100.png" alt="down" />
                    </button>
                </div>

                <button>{t("fifth.follow us")}<img src="../../IMG/icons8-вниз-100.png" alt="down" /></button>
                <button>{t("fifth.follow us")}<img src="../../IMG/icons8-вниз-100.png" alt="down" /></button>
            </div> */}
            <div className="assistant font-gramatika-bold">
                <h1>Нужна помощь?</h1>
                <div className="phone">
                    <img src="../../IMG/icons8-телефон-100.png" alt="phone" />
                    <p>+7 (926) 786 63 08</p>
                </div>
            </div>
            <div className="ae">
                <h2 className="font-gramatika-bold">
                    Aeternum Eleven
                </h2>
                <h3 className="font-gramatika-reg">
                    {t("fifth.text")}
                </h3>
            </div>



        </div>
    )
}

export default Fifth;