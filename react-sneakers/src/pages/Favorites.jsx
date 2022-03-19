import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';

function Favorites({ onAddToFavorite }) {
    const { favorites } = React.useContext(AppContext);

    return (
        <main className="content">
            <div className="content__header">
                <h1 className="content__title">Мои закладки</h1>
            </div>
            <div className="products">
                {favorites.map((item, index) => (
                    <Card
                        key={index}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        favorited={true}
                        onFavorite={onAddToFavorite}
                    />
                ))}
            </div>
        </main>
    )
}

export default Favorites;