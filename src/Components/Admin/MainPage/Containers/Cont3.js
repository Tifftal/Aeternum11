import React, { useState } from "react";
import "./Cont3.css"
import { useTranslation } from "react-i18next";

const Container3 = () => {

    return (

        <div className="container-3">
            <h1 className="font-gramatika-bold">Container 2</h1>
            <div className="cont3-flex-row">
                <div className="poster-cont3">
                    <div className="posterImg-cont3">
                    </div>
                    <div className="posterInfo-cont3 font-gramatika-bold">
                        <h2 className="font-gramatika-bold">Рекомендуем</h2>
                        <h1 className="font-gramatika-reg">text</h1>
                        <p className="font-gramatika-reg">text</p>
                        <a href="/"><button>Узнать больше</button></a>
                    </div>
                </div>

                <div className="edit-cont-3">
                    <form>
                        <div className="input-form-cont-3">
                            <label>Image</label>
                            <input type='file'></input>
                        </div>
                        <div className="cont-3-inputs">
                            <div className="input-form-cont-3">
                                <input className='input-text' type='text' placeholder="Заголовок"></input>
                                <input className='input-text' type='text' placeholder="Текст"></input>
                            </div>
                        </div>
                        <button className="edit-cont3 font-gramatika-bold">Сохранить</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Container3;