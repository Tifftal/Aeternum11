import React from "react";
import { useTranslation } from "react-i18next";
import "./MenuCard.css";

const MenuCard = ({ data }) => {
  const [t] = useTranslation("global");

  return (
    <div className="menu-card">
      <svg
        xmlns={data.svg.xmlns}
        width={data.svg.width}
        height={data.svg.height}
        viewBox={data.svg.viewBox}
        fill={data.svg.fill}
      >
        <path d={data.path.d} fill={data.path.fill} />
      </svg>
      <a href={data.a.href} style={ window.innerWidth < 768 ? {
        padding: "20px 0 20px 0"
      } : {
        
      }}>{data.a.content}</a>
    </div>
  );
};

export default MenuCard;
