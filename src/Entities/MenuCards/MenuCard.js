import React, { useTransition } from "react";

const MenuCard = ({ data }) => {
    const [t] = useTransition("global");

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