import React from 'react';
import axios from 'axios';
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Header from './components/Header';
import Cart from './components/Cart';
import { Routes, Route } from 'react-router-dom';
import AppContext from './context'

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios.get('https://61b249b6c8d4640017aaf32f.mockapi.io/Items').then((res) => {
      setItems(res.data);
    });
    axios.get('https://61b249b6c8d4640017aaf32f.mockapi.io/cart').then((res) => {
      setCartItems(res.data);
    });
    axios.get('https://61b249b6c8d4640017aaf32f.mockapi.io/favorites').then((res) => {
      setFavorites(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {
    if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://61b249b6c8d4640017aaf32f.mockapi.io/cart/${obj.id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    } else {
      axios.post('https://61b249b6c8d4640017aaf32f.mockapi.io/cart', obj);
      setCartItems((prev) => [...prev, obj]);
    }

  };

  const onRemoveItem = (id) => {
    axios.delete(`https://61b249b6c8d4640017aaf32f.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  // const onAddToFavorite: (obj: any) => void
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => favObj.id === obj.id)) {
        axios.delete(`https://61b249b6c8d4640017aaf32f.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post('https://61b249b6c8d4640017aaf32f.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, setCartOpened, setCartItems }}>
      <div className="wrapper">
        {cartOpened && <Cart items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route path="/" element={<Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
          />} />
          <Route path="/favorites" element={<Favorites
            items={favorites} onAddToFavorite={onAddToFavorite}
          />} />
        </Routes>



      </div >
    </AppContext.Provider>
  );
}


export default App;
