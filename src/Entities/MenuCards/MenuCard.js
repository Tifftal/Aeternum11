import React from "react";
import { useTranslation } from "react-i18next";
import "./MenuCard.css";

const MenuCard = ({ data }) => {
  const [t] = useTranslation("global");

  return (
    <div className="menu-card">
      <a href={data.a.href} style={window.innerWidth < 768 ? {
        padding: "20px 0 20px 0"
      } : {

      }}><img src={data.img.src} style={{ backgroundColor: "white" }} />{data.a.content}</a>
    </div>
  );
};

export default MenuCard;
