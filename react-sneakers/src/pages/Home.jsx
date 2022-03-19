import Card from '../components/Card';
function Home({
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart }) {

    return (

        <main className="content">
            <img className="intro__image" src="../img/intro.png" alt="intro" />
            <div className="content__header">
                <h1 className="content__title">{searchValue ? `Поиск по запросу "${searchValue} "` : `Все кроссовки`}</h1>
                <div className="search-block">
                    <img className="search-block__logo" width="14px" height="14px" src="/img/search.svg" alt="search" />
                    {searchValue && (
                        <img
                            onClick={() => setSearchValue('')}
                            className="search-block__clear"
                            width="18px"
                            height="18px"
                            src="img/remove.svg" alt="button" />)}
                    <input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder="Поиск..." />
                </div>
            </div>
            <div className="products">

                {items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
                    <Card
                        key={index}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        onFavorite={(obj) => onAddToFavorite(obj)}
                        onPlus={(obj) => onAddToCart(obj)}
                    />
                ))}
            </div>
        </main>
    )
}

export default Home;