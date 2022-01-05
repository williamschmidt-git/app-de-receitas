import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDrinkId } from '../services/helpers';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DrinksInProgress() {
  const drinkInProgress = localStorage.getItem('inProgressRecipes');
  const parseDrink = JSON.parse(drinkInProgress);
  console.log(parseDrink);
  const arrayOfIngredientsAndMeasurements = localStorage
    .getItem('arrayOfIngredientsAndMeasurements');
  const arrayToRender = JSON.parse(arrayOfIngredientsAndMeasurements);
  console.log(arrayToRender);

  let teste = false;

  if (parseDrink === null || arrayToRender === null) {
    teste = true;
  }

  return (
    <div>
      <img
        src={ parseDrink.strDrinkThumb }
        alt={ parseDrink.strDrink }
        data-testid="recipe-photo"
        style={ { width: '40px', height: '40px' } }
      />
      <h1 data-testid="recipe-title">{ parseDrink.strDrink }</h1>
      <button
        type="button"
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="share" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        <img src={ whiteHeartIcon } alt="favorite" />
      </button>
      <h3>Ingredientes:</h3>
      <div>
        {
          arrayToRender.map((ingredient, index) => (
            <div
              key={ index }
            >
              <input
                type="checkbox"
                data-testid={ `${index}-ingredient-step` }
              />
            &nbsp;
              <span>
                {`${ingredient[0]} - ${ingredient[1]}`}
              </span>
            </div>
          ))
        }
      </div>
      <h4 data-testid="recipe-category">{ parseDrink.strCategory }</h4>
      <div>
        <h3>Instructions: </h3>
        <p data-testid="instructions">{parseDrink.strInstructions}</p>
      </div>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        // onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default DrinksInProgress;
