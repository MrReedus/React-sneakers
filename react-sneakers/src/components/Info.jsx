import React from "react";
import AppContext from '../context'
const Info = ({ title, image, description }) => {
    const { setCartOpened } = React.useContext(AppContext)
    return (

        <div className="cart-clear">
            <img className="cart-clear__image" src={image} alt="box" width="120px" />
            <h2 className="cart-clear__title">{title}</h2>
            <p className="cart-clear__subtitle">{description}</p>
            <button onClick={() => setCartOpened(false)} className="cart__button_back">Вернуться назад
                <img className="back-btn" width="14px" height="12px" src="img/arrow-back.svg" alt="arrow" />
            </button>
        </div>





    )
}




export default Info