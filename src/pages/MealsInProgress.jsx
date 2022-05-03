/* eslint-disable react/jsx-max-depth */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchMealId, arrayOfIngredientsAndMeasurements } from '../services/helpers';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import {
  getInProgressStoraged,
  getProgressStored,
  onClipboardClicked,
  saveFavoriteRecipeOnStorage,
  setHeartIcon,
  isButtonFinishDisabled,
  saveDoneRecipeOnStorage } from '../services/supportFunctions';
import ApplicationContext from '../context/ApplicationContext';
import '../styles/inProgress.css';

function MealsInProgress() {
  const {
    storedProgress,
    setStoredProgress,
    clipboardState,
    setClipboardState } = useContext(ApplicationContext);
  const [selectedMeal, setSelectedMeal] = useState({});
  const [isRecipeFavorite, setRecipeToFavorite] = useState(false);
  const [isFinishButtonEnabled, setButtonToFinish] = useState(true);
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
      }
      setStoredProgress(parseRecipesInProgress);
      localStorage.setItem('inProgressRecipes', JSON.stringify(parseRecipesInProgress));
    }
  }, []);

  useEffect(() => {
    setHeartIcon(setRecipeToFavorite, id);
  }, []);

  useEffect(() => {
    isButtonFinishDisabled(storedProgress, history, selectedMeal, setButtonToFinish);
  }, [storedProgress]);

  return (
    <div className="inProgress-container-all">
      <div className="inProgress-container">
        <button
          type="button"
          disabled
          data-testid="recipe-category"
          id="category-in-progress"
          className="btn btns-recipe-details text-category btn-warning"
        >
          { selectedMeal.strCategory }
        </button>
        <div className="photo-ingredients">
          <h1 data-testid="recipe-title">{ selectedMeal.strMeal }</h1>
          <img
            className="recipe-photo"
            src={ selectedMeal.strMealThumb }
            alt={ selectedMeal.strMeal }
            data-testid="recipe-photo"
          />
          <div className="ingredients-container">
            <div className="btns-container">
              <div
                className="icon"
                data-testid="share-btn"
                onClick={ () => {
                  const URL = history.location.pathname;
                  onClipboardClicked(setClipboardState, URL);
                } }
              >
                <img className="share-icon" src={ shareIcon } alt="share" />
              </div>
              {clipboardState ? 'Link copiado!' : ''}
              <div
                className="icon"
                data-testid="favorite-btn"
                src={ isRecipeFavorite ? 'blackHeartIcon' : 'whiteHeartIcon' }
                onClick={ () => {
                  saveFavoriteRecipeOnStorage(selectedMeal, 'comida');
                  setRecipeToFavorite(!isRecipeFavorite);
                } }
              >
                {isRecipeFavorite ? (
                  <img className="favorite-icon" src={ blackHeartIcon } alt="desfavoritar" />
                )
                  : (<img className="favorite-icon" src={ whiteHeartIcon } alt="favoritar" />) }
              </div>
            </div>
            <h3 id="ingredients-h3">Ingredientes</h3>
            <div className="ingredients-list">
              {
                arrayOfIngredientsAndMeasurements(selectedMeal).map((ingredient, index) => (
                  <div
                    key={ index }
                    data-testid={ `${index}-ingredient-step` }
                    className="ingredient-step"
                  >
                    <label
                      htmlFor={ ingredient[0] }
                      style={ { overflow: 'hidden' } }
                    >
                      <input
                        type="checkbox"
                        checked={ getProgressStored(ingredient, id, storedProgress, 'meals') }
                        id={ ingredient[0] }
                        name={ ingredient[0] }
                        onChange={ ({ target }) => {
                          getInProgressStoraged('meals', id, target.name);
                          const getStoredProgress = localStorage.getItem('inProgressRecipes');
                          const parseStored = JSON.parse(getStoredProgress);
                          setStoredProgress(parseStored);
                        } }
                      />
                    &nbsp;
                      <span className="ingredient-span">
                        {`${ingredient[0]} - ${ingredient[1]}`}
                      </span>
                    </label>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="instructions-container">
          <h3>Instructions</h3>
          <p data-testid="instructions">{selectedMeal.strInstructions}</p>
        </div>
        <button
          className="btn btns-recipe-details btn-make-recipe btn-danger in-progress-finish-recipe"
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ isFinishButtonEnabled }
          onClick={ () => {
            history.push('/receitas-feitas');
            saveDoneRecipeOnStorage(selectedMeal, 'comida');
          } }
        >
          Finalizar Receita
        </button>
      </div>
    </div>
  );
}

export default MealsInProgress;
