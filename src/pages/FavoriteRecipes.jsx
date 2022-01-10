import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { onClipboardClicked, unfavoriteButton } from '../services/supportFunctions';
import ApplicationContext from '../context/ApplicationContext';

function FavoriteRecipes() {
  const [reRender, setRerender] = useState(false);
  const [reRenderFoodOnly, setReRenderFoodOnly] = useState(false);
  const [filteredStorage, setFilteredStorage] = useState([]);
  const history = useHistory();
  const { clipboardState,
    setClipboardState } = useContext(ApplicationContext);
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(filteredStorage);

  const renderByFilterButton = ({ target }, array) => {
    // console.log(target.innerText);
    if (target) {
      if (target.innerText === 'Food') {
        const newArr = array.filter((e) => e.type === 'comida');
        setFilteredStorage(newArr);
      } else if (target.innerText === 'Drink') {
        const newArr = array.filter((e) => e.type === 'bebida');
        console.log(newArr);
        setFilteredStorage(newArr);
      }
    } else {
      return renderFavorited();
    }
  };

  const renderFavorites = (e, type) => {
    if (type === 'comida') {
      return (
        <div key={ e.id }>
          <h4 data-testid="0-horizontal-name">
            {e.name}
          </h4>
          <img
            src={ e.image }
            alt={ e.name }
            style={ { width: '40px', height: '40px' } }
            data-testid="0-horizontal-image"
          />
          <h5 data-testid="0-horizontal-top-text">{`${e.area} - ${e.category}`}</h5>
          <button
            type="button"
            data-testid="0-horizontal-share-btn"
            src={ shareIcon }
            onClick={ () => {
              const URL = history.location.pathname;
              onClipboardClicked(setClipboardState, URL);
            } }
          >
            <img alt="share" src={ shareIcon } />
          </button>
          <p>
            {clipboardState ? 'Link copiado!' : ''}
          </p>

          <button
            type="button"
            data-testid="0-horizontal-favorite-btn"
            src={ blackHeartIcon }
            onClick={ () => {
              unfavoriteButton(e.id);
              setRerender(!reRender);
            } }

          >
            <img
              alt="favorite"
              src={ blackHeartIcon }
            />
          </button>
        </div>
      );
    }

    if (type === 'bebida') {
      return (
        <div key={ e.id }>
          <h4 data-testid="1-horizontal-name">
            {e.name}
          </h4>
          <img
            src={ e.image }
            alt={ e.name }
            style={ { width: '40px', height: '40px' } }
            data-testid="1-horizontal-image"
          />
          <h5 data-testid="1-horizontal-top-text">{e.alcoholicOrNot}</h5>
          <button
            type="button"
            data-testid="1-horizontal-share-btn"
            src={ shareIcon }
            onClick={ () => {
              const URL = history.location.pathname;
              onClipboardClicked(setClipboardState, URL);
            } }

          >
            <img
              alt="share"
              src={ shareIcon }
            />
          </button>
          <p>
            {clipboardState ? 'Link copiado!' : ''}
          </p>

          <button
            type="button"
            data-testid="1-horizontal-favorite-btn"
            src={ blackHeartIcon }
            onClick={ () => {
              unfavoriteButton(e.id);
              setRerender(!reRender);
            } }

          >
            <img
              alt="favorite"
              src={ blackHeartIcon }
            />
          </button>
        </div>
      );
    }
  };

  const renderFavorited = (arrayOfFavorites) => (
    <div>
      {
        !arrayOfFavorites ? (
          <>
          </>

        ) : (
          <div>
            {arrayOfFavorites.map((e) => (
              <div key={ e.id }>
                <div>
                  {renderFavorites(e, e.type)}
                </div>

              </div>
            ))}

          </div>

        )
      }
    </div>
  );

  return (
    <div>
      <Header pageName="Receitas Favoritas" />
      {renderFavorited(favoriteRecipes)}
      {/* {renderByFilterButton(favoriteRecipes)} */}
      <div>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ (e) => {
            // renderFoodOnly(favoriteRecipes);
            renderByFilterButton(e, favoriteRecipes);
            setReRenderFoodOnly(!reRenderFoodOnly);
          } }
        >
          Food
        </button>

        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ (e) => {
          // renderFoodOnly(favoriteRecipes);
            renderByFilterButton(e, favoriteRecipes);
            setReRenderFoodOnly(!reRenderFoodOnly);
          } }
        >
          Drink
        </button>

        <button data-testid="filter-by-all-btn" type="button">
          All
        </button>
      </div>
    </div>
  );
}

export default FavoriteRecipes;
