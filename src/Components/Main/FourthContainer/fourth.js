import React, { useState } from "react";
import "./fourth.css";
import { useTranslation } from "react-i18next";

const Fourth = () => {
    const [t] = useTranslation("global");

    const [email, setEmail] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [genderError, setGenderError] = useState(false);
    const [agreedError, setAgreedError] = useState(false);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError(value === "");
    }

    const handleGenderChange = (e) => {
        setSelectedGender(e.target.value);
        setGenderError(false);
    }

    const handleAgreeChange = (e) => {
        setAgreed(e.target.checked);
        setAgreedError(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === "") {
            setEmailError(true);
        }

        if (!selectedGender) {
            setGenderError(true);
        }

        if (!agreed) {
            setAgreedError(true);
        }

        
    }

    return (
        <div className="fourth">
            <div className="fourthInfo">
                {t("fourth.info")}
            </div>
            <div className="NewSt ofnt-gramatika-bold">
                <h1>{t("fourth.title")}</h1>
                <p>{t("fourth.text")}</p>
                <form
                    className="emailForm"
                    onSubmit={handleSubmit}
                >
                    <input
                        className="email"
                        id={emailError ? "error" : ""}
                        type="email"
                        name="email"
                        onChange={handleEmailChange}
                    />
                    <label for="email" className="email-label">{t("fourth.email")}</label>
                    {emailError && <p>{t("fourth.emailError")}</p>}
                    <div className="chooseGender">
                        <div className="gender" >
                            <input
                                type="checkbox"
                                name="gender"
                                value="women"
                                checked={selectedGender === "women"}
                                onChange={handleGenderChange}
                            />
                            <label>{t("fourth.women")}</label>
                        </div>
                        <div className="gender" >
                            <input
                                type="checkbox"
                                name="gender"
                                value="men"
                                checked={selectedGender === "men"}
                                onChange={handleGenderChange}
                            />
                            <label>{t("fourth.men")}</label>
                        </div>
                        <div className="gender" >
                            <input
                                type="checkbox"
                                name="gender"
                                value="none-binary"
                                checked={selectedGender === "none-binary"}
                                onChange={handleGenderChange}
                            />
                            <label>{t("fourth.none-binary")}</label>
                        </div>
                    </div>
                    {genderError && <p>{t("fourth.genderError")}</p>}
                    <div className="agree">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={handleAgreeChange}
                        />
                        <label>{t("fourth.agree")}</label>
                    </div>
                    {agreedError && <p>{t("fourth.agreeError")}</p>}
                    <span className="BtnSb font-gramatika-bold">
                        <button type="submit">{t("fourth.subscribe")}</button>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Fourth;