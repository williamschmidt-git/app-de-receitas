import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDrinkId, arrayOfIngredientsAndMeasurements } from '../services/helpers';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import ApplicationContext from '../context/ApplicationContext';
import {
  getInProgressStoraged,
  getProgressStored,
  onClipboardClicked,
  checkIfThereIsLocalStorage } from '../services/supportFunctions';

function DrinksInProgress() {
  const {
    storedProgress,
    setStoredProgress,
    clipboardState,
    setClipboardState,
  } = useContext(ApplicationContext);
  const [selectedDrink, setSelectedDrink] = useState({});
  const history = useHistory();
  const { id } = useParams();

  const searchId = async () => {
    const responseAPI = await fetchDrinkId(id);
    setSelectedDrink(responseAPI.drinks[0]);
  };

  useEffect(() => {
    const currentDrink = localStorage.getItem('currentDrink');
    const parseCurrentDrink = JSON.parse(currentDrink);
    if (!parseCurrentDrink) {
      searchId();
    } else {
      setSelectedDrink(parseCurrentDrink);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('inProgressRecipes');
    const parseRecipesInProgress = JSON.parse(stored);
    if (!parseRecipesInProgress) {
      const inProgressRecipes = {
        cocktails: {
          [id]: [],
        },
        meals: {},
      };
      setStoredProgress(inProgressRecipes);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    } else {
      const checkedIngredients = parseRecipesInProgress.cocktails[id];
      if (!checkedIngredients || checkedIngredients.length === 0) {
        parseRecipesInProgress.cocktails[id] = [];
      } else {
        parseRecipesInProgress.cocktails[id] = [...parseRecipesInProgress.cocktails[id]];
      }
      setStoredProgress(parseRecipesInProgress);
      localStorage.setItem('inProgressRecipes', JSON.stringify(parseRecipesInProgress));
    }
  }, []);

  return (
    <div>
      <img
        src={ selectedDrink.strDrinkThumb }
        alt={ selectedDrink.strDrink }
        data-testid="recipe-photo"
        style={ { width: '40px', height: '40px' } }
      />
      <h1 data-testid="recipe-title">{ selectedDrink.strDrink }</h1>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          let URL = history.location.pathname;
          const removeInProgress = URL.split('/').includes('in-progress');
          if (removeInProgress) {
            const positionToslice = 3;
            URL = URL.split('/').slice(0, positionToslice).join('/');
          }
          onClipboardClicked(setClipboardState, URL);
        } }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      {clipboardState ? 'Link copiado!' : ''}
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => {
          let addNewRecipe = [];
          if (checkIfThereIsLocalStorage('favoriteRecipes')) {
            const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
            addNewRecipe = [...favoriteRecipes, selectedDrink];
            localStorage.setItem('favoriteRecipes', JSON.stringify(addNewRecipe));
          }
          localStorage.setItem('favoriteRecipes', JSON.stringify(addNewRecipe));
        } }
      >
        <img src={ whiteHeartIcon } alt="favorite" />
      </button>
      <h3>Ingredientes:</h3>
      <div>
        {
          arrayOfIngredientsAndMeasurements(selectedDrink).map((ingredient, index) => (
            <div
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                checked={ getProgressStored(ingredient, id, storedProgress, 'cocktails') }
                name={ ingredient[0] }
                onChange={ ({ target }) => {
                  getInProgressStoraged('cocktails', id, target.name);
                  const getStoredProgress = localStorage.getItem('inProgressRecipes');
                  const parseStored = JSON.parse(getStoredProgress);
                  setStoredProgress(parseStored);
                } }
              />
            &nbsp;
              <span>
                {`${ingredient[0]} - ${ingredient[1]}`}
              </span>
            </div>
          ))
        }
      </div>
      <h4 data-testid="recipe-category">{ selectedDrink.strCategory }</h4>
      <div>
        <h3>Instructions: </h3>
        <p data-testid="instructions">{selectedDrink.strInstructions}</p>
      </div>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default DrinksInProgress;
