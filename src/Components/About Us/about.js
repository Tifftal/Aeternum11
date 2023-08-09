import React, { useTransition } from "react";
import "./about.css"
import { useTranslation } from "react-i18next";

const About = () => {
    const[t]=useTransition("global");

    return(
        <div className="about">
            about
        </div>
    )
}

export default About;