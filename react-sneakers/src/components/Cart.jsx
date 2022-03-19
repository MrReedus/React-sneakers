import React from 'react';
import Info from './Info'
import AppContext from '../context';
import axios from 'axios';

function Cart({ onClose, onRemove, items = [] }) {
    const { cartItems, setCartItems } = React.useContext(AppContext)
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    const onClickOrder = () => {
        try {
            axios.post('https://61b249b6c8d4640017aaf32f.mockapi.io/orders', cartItems);
            setIsOrderComplete(true);
            setCartItems([]);
        } catch {
            alert('Ошибка при создании заказа')
        }
    }

    return (
        <div className="overlay">
            <div className="cart">
                <h2>Корзина
                    <img onClick={onClose} className="cart__item-btn" width="32px" height="32px" src="img/remove.svg" alt="button" />
                </h2>

                {items.length > 0 ?
                    <div className="items">
                        <div>
                            {items.map((obj) => (
                                <div key={obj.id} className="cart__item">
                                    <img className="cart__item-image" width="70px" height="70px" src={obj.imageUrl} alt="sneakers" />
                                    <div className="cart__item_flex">
                                        <p>{obj.title}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <img
                                        onClick={() => onRemove(obj.id)}
                                        className="cart__item-btn"
                                        width="32px"
                                        height="32px"
                                        src="/img/remove.svg" alt="button" />
                                </div>
                            ))}
                        </div>
                        <div className="cart__result">
                            <li>
                                <span>Итого:</span>
                                <div></div>
                                <b>{totalPrice} руб.</b>
                            </li>
                            <li>
                                <span>Налог 5%:</span>
                                <div></div>
                                <b>{(totalPrice) * 0.05} руб. </b>
                            </li>
                        </div>
                        <button onClick={onClickOrder} className="cart__button">Оформить заказ
                            <img width="14px" height="12px" src="/img/arrow.svg" alt="arrow" />
                        </button>
                    </div>

                    : (
                        <Info
                            title={isOrderComplete ? "Заказ Оформлен!" : "Корзина пустая"}
                            description={isOrderComplete ? "Ваш заказ скоро будет передан курьерской доставке" : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                            image={isOrderComplete ? "/img/complete-order.png" : "/img/box.png"}
                        />
                    )}
            </div>
        </div>
    );
}

export default Cart