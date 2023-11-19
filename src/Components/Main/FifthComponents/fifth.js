import React from "react";
import "./fifth.css";
import { useTranslation } from "react-i18next";

const Fifth = () => {
    const [t] = useTranslation("global");

    return (
        <div className="fifth">
            <div className="footerMenu">
                <div className="footerDr">
                    <button>
                        {t("fifth.follow us")}
                        <img src="../../IMG/icons8-вниз-100.png" alt="down" />
                    </button>
                    {/* <div className="socials">
                        fhhf
                    </div> */}
                </div>

                <button>{t("fifth.follow us")}<img src="../../IMG/icons8-вниз-100.png" alt="down" /></button>
                <button>{t("fifth.follow us")}<img src="../../IMG/icons8-вниз-100.png" alt="down" /></button>
            </div>
            <div className="assistant font-gramatika-bold">
                <h1>{t("fifth.assistant")}</h1>
                <div className="phone">
                    <img src="../../IMG/icons8-телефон-100.png" alt="phone" />
                    <p>+7 (123) 456 78 90</p>
                </div>
            </div>
            <div>
                <h2 className="font-gramatika-bold">
                    Aeternum Eleven
                </h2>
                <h3>
                    {t("fifth.text")}
                </h3>
            </div>



        </div>
    )
}

export default Fifth;