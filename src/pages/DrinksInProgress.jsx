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
          const URL = history.location.pathname;
          onClipboardClicked(setClipboardState, URL);
        } }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      {clipboardState ? 'Link copiado!' : ''}
      <button
        type="button"
        data-testid="favorite-btn"
        src={ isRecipeFavorite ? 'blackHeartIcon' : 'whiteHeartIcon' }
        onClick={ () => {
          saveFavoriteRecipeOnStorage(selectedDrink, 'bebida');
          setRecipeToFavorite(!isRecipeFavorite);
        } }
      >
        {isRecipeFavorite ? (
          <img src={ blackHeartIcon } alt="desfavoritar" />
        )
          : (<img src={ whiteHeartIcon } alt="favoritar" />) }
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
        disabled={ isFinishButtonEnabled }
        onClick={ () => {
          history.push('/receitas-feitas');
          saveDoneRecipeOnStorage(selectedDrink, 'bebida');
        } }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default DrinksInProgress;
