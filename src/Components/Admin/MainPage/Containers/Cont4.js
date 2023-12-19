import React, { useEffect, useState } from "react";
import "./Cont4.css"

const Container4 = () => {


    return (
        <div className="container-4">
            <h1 className="font-gramatika-bold">Главная страница</h1>
            <div className="cont-4">
                <div className="img-cont-4" style={{width: "60%"}}>
                    <h3 className="font-gramatika-reg">Добавить новый фон</h3>
                    <div className="input-form-cont-4">
                        <input
                            type="file"
                            accept="image/*"
                        />
                    </div>
                </div>
                <div className="img-cont-4">
                    <h3 className="font-gramatika-reg">Текущий фон</h3>
                    <img src="../IMG/background.jpg" />
                </div>
            </div>
        </div>

    )
}

export default Container4;