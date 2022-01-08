import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchMealId, arrayOfIngredientsAndMeasurements } from '../services/helpers';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import {
  getInProgressStoraged,
  getProgressStored,
  onClipboardClicked } from '../services/supportFunctions';
import ApplicationContext from '../context/ApplicationContext';

function MealsInProgress() {
  const {
    storedProgress,
    setStoredProgress,
    clipboardState,
    setClipboardState } = useContext(ApplicationContext);
  const [selectedMeal, setSelectedMeal] = useState({});
  const history = useHistory();
  const { id } = useParams();

  const searchId = async () => {
    const responseAPI = await fetchMealId(id);
    setSelectedMeal(responseAPI.meals[0]);
  };

  useEffect(() => {
    const currentMeal = localStorage.getItem('currentMeal');
    const parseCurrentMeal = JSON.parse(currentMeal);
    if (!parseCurrentMeal) {
      searchId();
    } else {
      setSelectedMeal(parseCurrentMeal);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('inProgressRecipes');
    const parseRecipesInProgress = JSON.parse(stored);
    if (!parseRecipesInProgress) {
      const inProgressRecipes = {
        cocktails: {},
        meals: {
          [id]: [],
        },
      };
      setStoredProgress(inProgressRecipes);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    } else {
      const checkedIngredients = parseRecipesInProgress.meals[id];
      if (!checkedIngredients || checkedIngredients.length === 0) {
        parseRecipesInProgress.meals[id] = [];
      } else {
        parseRecipesInProgress.meals[id] = [...parseRecipesInProgress.meals[id]];
      }
      setStoredProgress(parseRecipesInProgress);
      localStorage.setItem('inProgressRecipes', JSON.stringify(parseRecipesInProgress));
    }
  }, []);

  return (
    <div>
      <img
        src={ selectedMeal.strMealThumb }
        alt={ selectedMeal.strMeal }
        data-testid="recipe-photo"
        style={ { width: '40px', height: '40px' } }
      />
      <h1 data-testid="recipe-title">{ selectedMeal.strMeal }</h1>
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
      >
        <img src={ whiteHeartIcon } alt="favorite" />
      </button>
      <h3>Ingredientes:</h3>
      <div>
        {
          arrayOfIngredientsAndMeasurements(selectedMeal).map((ingredient, index) => (
            <div
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                checked={ getProgressStored(ingredient, id, storedProgress, 'meals') }
                name={ ingredient[0] }
                onChange={ ({ target }) => {
                  getInProgressStoraged('meals', id, target.name);
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
      <h4 data-testid="recipe-category">{ selectedMeal.strCategory }</h4>
      <div>
        <h3>Instructions: </h3>
        <p data-testid="instructions">{selectedMeal.strInstructions}</p>
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

export default MealsInProgress;
