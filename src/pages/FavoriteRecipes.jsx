import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { onClipboardClicked, unfavoriteButton } from '../services/supportFunctions';
import ApplicationContext from '../context/ApplicationContext';

function FavoriteRecipes() {
  const history = useHistory();
  const { clipboardState,
    setClipboardState } = useContext(ApplicationContext);
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  // useEffect(() => {
  //   effect;
  //   return () => {
  //     cleanup;
  //   };
  // }, [favoriteRecipes]);

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
              const URL = `/comidas/${e.id}`;
              console.log(e.id);
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
            onClick={ unfavoriteButton }

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
              const URL = `/bebidas/${e.id}`;
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

  return (
    <div>
      <Header pageName="Receitas Favoritas" />
      <div>
        {
          !favoriteRecipes ? (
            null
          ) : (
            <div>
              {favoriteRecipes.map((e) => (
                <div key={ e.id }>
                  <div>
                    {renderFavorites(e, e.type)}
                  </div>
                </div>
              ))}
              <div>
                <button data-testid="filter-by-food-btn" type="button">
                  Food
                </button>
                <button data-testid="filter-by-drink-btn" type="button">
                  Drink
                </button>
                <button data-testid="filter-by-all-btn" type="button">
                  All
                </button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
