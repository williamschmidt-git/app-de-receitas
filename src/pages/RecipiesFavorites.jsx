import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { onClipboardClicked, unfavoriteButton } from '../services/supportFunctions';
import ApplicationContext from '../context/ApplicationContext';

function RecipiesFavorites() {
  const [reRender, setRerender] = useState(false);
  const { clipboardState,
    setClipboardState } = useContext(ApplicationContext);
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

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
            onClick={ () => onClipboardClicked(setClipboardState, e.id, 'comida') }
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
            onClick={ () => onClipboardClicked(setClipboardState, e.id, 'bebida') }

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
          <div>
            oi
          </div>

        ) : (
          <div>
            {arrayOfFavorites.map((e) => (
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
  );

  return (
    <div>
      <Header pageName="Receitas Favoritas" />
      {renderFavorited(favoriteRecipes)}
    </div>
  );
}

export default RecipiesFavorites;
