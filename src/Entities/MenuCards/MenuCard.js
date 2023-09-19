import React from "react";
import { useTranslation } from "react-i18next";

const MenuCard = ({ data }) => {
    const [t] = useTranslation("global");

    return (
        <div>
            <svg
                xmnlns={data.svg.xmnls}
                width={data.svg.width}
                height={data.svg.height}
                viewBox={data.svg.viewBox}
                fill={data.svg.fill}
            >
                <path
                    d={data.path.d}
                    fill={data.path.fill}
                />
            </svg>
            <a
                href={data.a.href}
            >
                {data.a.content}
            </a>
        </div>
    )
}

export default MenuCard;