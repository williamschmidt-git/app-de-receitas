/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDrinkId, arrayOfIngredientsAndMeasurements } from '../services/helpers';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ApplicationContext from '../context/ApplicationContext';
import {
  getInProgressStoraged,
  getProgressStored,
  onClipboardClicked,
  saveFavoriteRecipeOnStorage,
  setHeartIcon,
  isButtonFinishDisabled,
  saveDoneRecipeOnStorage } from '../services/supportFunctions';
import '../styles/inProgress.css';

function DrinksInProgress() {
  const {
    storedProgress,
    setStoredProgress,
    clipboardState,
    setClipboardState,
  } = useContext(ApplicationContext);
  const [selectedDrink, setSelectedDrink] = useState({});
  const [isRecipeFavorite, setRecipeToFavorite] = useState(false);
  const [isFinishButtonEnabled, setButtonToFinish] = useState(true);
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
      }
      setStoredProgress(parseRecipesInProgress);
      localStorage.setItem('inProgressRecipes', JSON.stringify(parseRecipesInProgress));
    }
  }, []);

  useEffect(() => {
    setHeartIcon(setRecipeToFavorite, id);
  }, []);

  useEffect(() => {
    isButtonFinishDisabled(storedProgress, history, selectedDrink, setButtonToFinish);
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
          { selectedDrink.strCategory }
        </button>
        <div className="photo-ingredients">
          <h1 data-testid="recipe-title">{ selectedDrink.strDrink }</h1>
          <img
            className="recipe-photo"
            src={ selectedDrink.strDrinkThumb }
            alt={ selectedDrink.strDrink }
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
                  saveFavoriteRecipeOnStorage(selectedDrink, 'bebida');
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
                arrayOfIngredientsAndMeasurements(selectedDrink).map((ingredient, index) => (
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
                        checked={ getProgressStored(ingredient, id, storedProgress, 'cocktails') }
                        id={ ingredient[0] }
                        name={ ingredient[0] }
                        onChange={ ({ target }) => {
                          getInProgressStoraged('cocktails', id, target.name);
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
          <p data-testid="instructions">{selectedDrink.strInstructions}</p>
        </div>
        <button
          className="btn btns-recipe-details btn-make-recipe btn-danger in-progress-finish-recipe"
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ isFinishButtonEnabled }
          onClick={ () => {
            history.push('/receitas-feitas');
            saveDoneRecipeOnStorage(selectedDrink, 'bebida');
          } }
        >
          Finalizar Receita
        </button>
      </div>
    </div>
  );
}

export default DrinksInProgress;
