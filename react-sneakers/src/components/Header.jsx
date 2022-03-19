import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context'
function Header(props) {
    const { cartItems } = React.useContext(AppContext);
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    return (
        <header className="header">
            <Link className="routerLink" to="/">
                <div className="headerLeft">
                    <img width="40px" height="40px" src="/img/logo.png"
                        alt="logotype" />
                    <div className="header__Info">
                        <h3 className="header__Info_title">React Sneakers</h3>
                        <p className="header__Info_subtitle">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="user-navigation">
                <li onClick={props.onClickCart} className="user-navigation__item">
                    <img width="18px" height="18px" src="/img/cart.svg" alt="cart" />
                    <span className="user-navigation__item_price">{totalPrice} руб.</span>
                </li>
                <li className="user-navigation__item">
                    <Link to="/favorites">
                        <img width="18px" height="18px" src="/img/bookmarks.svg" alt="bookmarks" />
                    </Link>

                </li>
                <li className="user-navigation__item">
                    <img width="18px" height="18px" src="/img/user.svg" alt="avatar" />
                </li>
            </ul>
        </header >

    );
}

export default Header