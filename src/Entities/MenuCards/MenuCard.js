import React from "react";
import { useTranslation } from "react-i18next";
import "./MenuCard.css";
import { Minio } from "../../api/config";

const MenuCard = ({ data }) => {
  const [t] = useTranslation("global");

  return (
    <div className="menu-card">
      <a href={`assortment/${data.categoryId}`} style={window.innerWidth < 768 ? {
        padding: "20px 0 20px 0"
      } : {

      }}><img src={`${Minio}/${data.path}`} style={{ backgroundColor: "white" }} />{data.categoryName}</a>
    </div>
  );
};

export default MenuCard;
