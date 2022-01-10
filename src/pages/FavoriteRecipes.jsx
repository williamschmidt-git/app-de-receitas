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

  const renderFavorites = (e, type, index) => {
    if (type === 'comida') {
      return (
        <div key={ e.id }>
          <h4 data-testid={ `${index}-horizontal-name` }>
            {e.name}
          </h4>
          <img
            src={ e.image }
            alt={ e.name }
            style={ { width: '40px', height: '40px' } }
            data-testid={ `${index}-horizontal-image` }
          />
          <h5 data-testid={ `${index}-horizontal-top-text` }>
            {`${e.area} - ${e.category}`}
          </h5>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ () => {
              const URL = `/${e.type}s/${e.id}`;

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
            data-testid={ `${index}-horizontal-favorite-btn` }
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
          <h4 data-testid={ `${index}-horizontal-name` }>
            {e.name}
          </h4>
          <img
            src={ e.image }
            alt={ e.name }
            style={ { width: '40px', height: '40px' } }
            data-testid={ `${index}-horizontal-image` }
          />
          <h5 data-testid={ `${index}-horizontal-top-text` }>{e.alcoholicOrNot}</h5>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
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
            data-testid={ `${index}-horizontal-favorite-btn` }
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
            {arrayOfFavorites.map((e, index) => (
              <div key={ e.id }>
                <div>
                  {renderFavorites(e, e.type, index)}
                </div>

              </div>
            ))}
          </div>
        )
      }
    </div>
  );

  const renderByFilterButton = ({ target }, array) => {
    if (target.value === 'Food') {
      const newArr = array.filter((e) => e.type === 'comida');
      setFilteredStorage(newArr);
    } else if (target.value === 'Drink') {
      const newArr = array.filter((e) => e.type === 'bebida');
      setFilteredStorage(newArr);
      return newArr;
    } else {
      setFilteredStorage(array);
    }
  };

  return (
    <div>
      <Header pageName="Receitas Favoritas" />
      {filteredStorage.length > 0 ? (
        renderFavorited(filteredStorage)
      ) : (
        renderFavorited(favoriteRecipes)
      )}

      <div>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          value="Food"
          onClick={ (e) => {
            renderByFilterButton(e, favoriteRecipes);
            setReRenderFoodOnly(!reRenderFoodOnly);
          } }
        >
          Food
        </button>

        <button
          data-testid="filter-by-drink-btn"
          type="button"
          value="Drink"
          onClick={ (e) => {
            renderByFilterButton(e, favoriteRecipes);
            setReRenderFoodOnly(!reRenderFoodOnly);
          } }
        >
          Drink
        </button>

        <button
          data-testid="filter-by-all-btn"
          type="button"
          value="All"
          onClick={ (e) => {
            renderByFilterButton(e, favoriteRecipes);
            setReRenderFoodOnly(!reRenderFoodOnly);
          } }
        >
          All
        </button>
      </div>
    </div>
  );
}

export default FavoriteRecipes;
