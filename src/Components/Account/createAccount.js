import React, { useState } from "react";
import "./createAccount.css";
import { useTranslation } from "react-i18next";

const CreateAccount = () => {
    const [t] = useTranslation("global");

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [gender, setGender] = useState("");
    const [birth, setBirth] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rpassword, setRPassword] = useState("");

    const [errors, setErrors] = useState({
        name: false,
        surname: false,
        gender: false,
        birth: false,
        phone: false,
        email: false,
        password: false,
        rpassword: false,
        matchPasswords: false,
    });

    const handleChangeInput = (e, field, setError) => {
        const value = e.target.value;
        setError(value === "");

        switch (field) {
            case "name":
                setName(value);
                break;
            case "surname":
                setSurname(value);
                break;
            case "gender":
                setGender(value);
                break;
            case "birth":
                setBirth(value);
                break;
            case "country":
                setCountry(value);
                break;
            case "state":
                setState(value);
                break;
            case "city":
                setCity(value);
                break;
            case "phone":
                setPhone(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "rpassword":
                setRPassword(value);
                break;
            default:
                break;
        }
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const newErrors = {
            name: name === "",
            surname: surname === "",
            gender: gender === "",
            birth: birth === Date.now(),
            country: country === "",
            state: state === "",
            city: city === "",
            phone: phone === "",
            email: email === "",
            password: password === "",
            rpassword: rpassword === "",
            matchPasswords: password !== rpassword,
        };

        setErrors(newErrors);
    };

    return (
        <form
            className="create_account"
            onSubmit={handleSubmitForm}
        >
            <h2>{t("create_account.title1")}</h2>
            <h1>{t("create_account.title2")}</h1>
            <p>{t("create_account.text1")}</p>

            <div className="registration">
                <input
                    type="text"
                    placeholder={t("create_account.first_name")}
                    onChange={(e) => { handleChangeInput(e, "name", setErrors) }}
                    id={errors.name ? "error" : ""}
                />
                <input
                    type="text"
                    placeholder={t("create_account.last_name")}
                    onChange={(e) => { handleChangeInput(e, "surname", setErrors) }}
                    id={errors.surname ? "error" : ""}
                />
                <input
                    type="text"
                    placeholder={t("create_account.gender")}
                    onChange={(e) => { handleChangeInput(e, "gender", setErrors) }}
                    id={errors.gender ? "error" : ""}
                />
                <input
                    type="text"
                    placeholder={t("create_account.date")}
                    onChange={(e) => { handleChangeInput(e, "birth", setErrors) }}
                    id={errors.birth ? "error" : ""}
                />
                <input
                    id="country"
                    type="text"
                    placeholder={t("create_account.country")}
                    onChange={(e) => { handleChangeInput(e, "country", setErrors) }}
                />
                <input
                    id="state"
                    type="text"
                    placeholder={t("create_account.state")}
                    onChange={(e) => { handleChangeInput(e, "state", setErrors) }}
                />
                <input
                    id="city"
                    type="text"
                    placeholder={t("create_account.city")}
                    onChange={(e) => { handleChangeInput(e, "city", setErrors) }}
                />
                <input
                    type="text"
                    placeholder={t("create_account.phone")}
                    onChange={(e) => { handleChangeInput(e, "phone", setErrors) }}
                    id={errors.phone ? "error" : ""}
                />
            </div>
            <div className="reg">
                <input
                    type="text"
                    placeholder={t("create_account.email")}
                    onChange={(e) => { handleChangeInput(e, "email", setErrors) }}
                    id={errors.email ? "error" : ""}
                />
                <input
                    type="password"
                    placeholder={t("create_account.password")}
                    onChange={(e) => { handleChangeInput(e, "password", setErrors) }}
                    id={errors.password || errors.matchPasswords ? "error" : ""}
                />
                <input
                    type="password"
                    placeholder={t("create_account.confirm")}
                    onChange={(e) => { handleChangeInput(e, "rpassword", setErrors) }}
                    id={errors.rpassword || errors.matchPasswords ? "error" : ""}
                />
            </div>
            <h3>{t("create_account.*")}</h3>
            <h4>{t("create_account.text2")}</h4>
            <div className="agreeAc">
                <input
                    type="checkbox"
                />
                <label>{t("create_account.check1")}</label>
            </div>
            <div className="agreeAc">
                <input
                    type="checkbox"
                />
                <label>{t("create_account.check2")}</label>
            </div>

            <span className="BtnAc"><button type="submit">{t("create_account.create")}</button></span>
        </form>
    )
}

export default CreateAccount;