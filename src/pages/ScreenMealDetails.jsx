import React, { useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import ApplicationContext from '../context/ApplicationContext';
import { fetchMealId, arrayOfIngredientsAndMeasurements } from '../services/helpers';
import {
  checkIfThereIsLocalStorage,
  onClipboardClicked,
  saveFavoriteRecipeOnStorage } from '../services/supportFunctions';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import DrinkCarousel from '../components/DrinkCarousel';

function ScreenMealDetails() {
  const { id } = useParams();
  const history = useHistory();
  const {
    selectedMeal,
    setSelectedMeal,
    clipboardState,
    setClipboardState,
    hasStartButton,
    setStartButton,
    alreadyStarted,
    setRecipeStarted,
  } = useContext(ApplicationContext);

  const searchId = async () => {
    const responseAPI = await fetchMealId(id);
    setSelectedMeal(responseAPI.meals[0]);
    localStorage.setItem('currentMeal', JSON.stringify(responseAPI.meals[0]));
  };

  useEffect(() => {
    searchId();
  }, []);

  useEffect(() => {
    if (checkIfThereIsLocalStorage('doneRecipes')) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      const recipeAlreadyMade = doneRecipes.some((recipe) => recipe.id === id);
      setStartButton(!recipeAlreadyMade);
    }
    if (checkIfThereIsLocalStorage('inProgressRecipes')) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const recipeStarted = Object.keys(inProgressRecipes.meals)
        .some((recipeID) => recipeID === id);
      setRecipeStarted(recipeStarted);
    }
  }, []);

  return (
    <div>
      <img
        src={ selectedMeal.strMealThumb }
        alt={ selectedMeal.strMealThumb }
        data-testid="recipe-photo"
        style={ { width: '80px', height: '80px' } }
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
      <p>
        {clipboardState ? 'Link copiado!' : ''}
      </p>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => {
          saveFavoriteRecipeOnStorage(selectedMeal, 'comida');
        } }
      >
        <img src={ whiteHeartIcon } alt="favorite" />

      </button>
      <h3>Recipe:</h3>
      <div>
        {
          arrayOfIngredientsAndMeasurements(selectedMeal).map((e, index) => (
            <div key={ index }>
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${e[0]} - ${e[1]}`}

              </p>
            </div>
          ))
        }
      </div>
      <h4 data-testid="recipe-category">{ `${selectedMeal.strCategory}` }</h4>
      <div>
        <h3>Instructions: </h3>
        <p data-testid="instructions">{selectedMeal.strInstructions}</p>
      </div>
      <ReactPlayer data-testid="video" url={ selectedMeal.strYoutube } />
      <DrinkCarousel />
      <footer>
        { hasStartButton ? (
          <button
            data-testid="start-recipe-btn"
            type="button"
            onClick={ () => history.push(`/comidas/${id}/in-progress`) }
            className="button-start-recipe"
          >
            {alreadyStarted ? 'Continuar Receita' : 'Iniciar Receita'}
          </button>
        ) : null }
      </footer>
    </div>
  );
}

export default ScreenMealDetails;
