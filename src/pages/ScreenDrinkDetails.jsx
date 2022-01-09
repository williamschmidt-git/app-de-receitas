import React, { useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchDrinkId, arrayOfIngredientsAndMeasurements } from '../services/helpers';
import {
  onClipboardClicked,
  checkIfThereIsLocalStorage,
  saveFavoriteRecipeOnStorage } from '../services/supportFunctions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import ApplicationContext from '../context/ApplicationContext';
import '../App.css';
import MealCarousel from '../components/MealCarousel';

function ScreenDrinkDetails() {
  const history = useHistory();
  const {
    selectedDrink,
    setSelectedDrink,
    clipboardState,
    setClipboardState,
    hasStartButton,
    setStartButton,
    alreadyStarted,
    setRecipeStarted,
  } = useContext(ApplicationContext);
  const { id } = useParams();

  const searchId = async () => {
    const responseAPI = await fetchDrinkId(id);
    setSelectedDrink(responseAPI.drinks[0]);
    localStorage.setItem('currentDrink', JSON.stringify(responseAPI.drinks[0]));
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
      const recipeStarted = Object.keys(inProgressRecipes.cocktails)
        .some((recipeID) => recipeID === id);
      setRecipeStarted(recipeStarted);
    }
  });

  return (
    <div>
      <img
        src={ selectedDrink.strDrinkThumb }
        alt={ selectedDrink.srtDrink }
        data-testid="recipe-photo"
        style={ { width: '40px', height: '40px' } }
      />
      <h1 data-testid="recipe-title">{ selectedDrink.strDrink }</h1>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => onClipboardClicked(setClipboardState, id) }
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
          saveFavoriteRecipeOnStorage(selectedDrink, 'bebida');
        } }
      >
        <img src={ whiteHeartIcon } alt="favorite" />
      </button>
      <h3>Ingredientes:</h3>
      <div>
        {
          arrayOfIngredientsAndMeasurements(selectedDrink).map((e, index) => (
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

      <h4
        data-testid="recipe-category"
      >
        { `${selectedDrink.strCategory} - ${selectedDrink.strAlcoholic}` }
      </h4>
      <div>
        <h3>Instructions: </h3>
        <p data-testid="instructions">{selectedDrink.strInstructions}</p>
      </div>
      <MealCarousel />
      <footer>
        { hasStartButton ? (
          <button
            data-testid="start-recipe-btn"
            type="button"
            onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
            className="button-start-recipe"
          >
            {alreadyStarted ? 'Continuar Receita' : 'Iniciar Receita'}
          </button>
        ) : null }
      </footer>
    </div>
  );
}

export default ScreenDrinkDetails;
