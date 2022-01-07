import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipiesFavorites() {
  // const [favorites, setFavorites] = useState([]);

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
          >
            <img alt="share" />
          </button>

          <button
            type="button"
            data-testid="0-horizontal-favorite-btn"
            src={ blackHeartIcon }
          >
            <img alt="favorite" />
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
          >
            <img alt="share" />
          </button>

          <button
            type="button"
            data-testid="1-horizontal-favorite-btn"
            src={ blackHeartIcon }
          >
            <img alt="favorite" />
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
            <div>
              oi
            </div>

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

export default RecipiesFavorites;

// cy.get('[data-testid="filter-by-all-btn"]');
//       cy.get('[data-testid="filter-by-food-btn"]');
//       cy.get('[data-testid="filter-by-drink-btn"]');
//       cy.get('[data-testid="0-horizontal-image"]');
//       cy.get('[data-testid="0-horizontal-top-text"]');
//       cy.get('[data-testid="0-horizontal-name"]');
//       cy.get('[data-testid="0-horizontal-share-btn"]');
//       cy.get('[data-testid="0-horizontal-favorite-btn"]');
//       cy.get('[data-testid="1-horizontal-image"]');
//       cy.get('[data-testid="1-horizontal-top-text"]');
//       cy.get('[data-testid="1-horizontal-name"]');
//       cy.get('[data-testid="1-horizontal-share-btn"]');
//       cy.get('[data-testid="1-horizontal-favorite-btn"]');
