import './Card.scss';
import React from 'react';


function Card({ id, title, imageUrl, price, onFavorite, onPlus, favorited = false }) {

    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const onClickPlus = () => {
        onPlus({ id, title, imageUrl, price });
        setIsAdded(!isAdded);
    };

    const onClickFavorite = () => {
        onFavorite({ id, title, imageUrl, price });
        setIsFavorite(!isFavorite);
    }

    return (
        <div className="products__item">
            <div className="favorite">
                <img onClick={onClickFavorite} className="product__btn" width="32px" height="32px" src={isFavorite ? 'img/heart-liked.svg' : '/img/heart-unliked.svg'} alt="heart" />
            </div>
            <img className="product__image" width="133px" height="112px" src={imageUrl} alt="sneakers" />
            <h5>{title}</h5>
            <div className="products__container">
                <div className="flex-wrapper">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>

                <img onClick={onClickPlus} className="product__btn" width="32px" height="32px" src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="" />

            </div>
        </div>
    );
}


export default Card;

