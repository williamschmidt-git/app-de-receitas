/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import ApplicationContext from '../context/ApplicationContext';
import { fetchMealId, arrayOfIngredientsAndMeasurements } from '../services/helpers';
import {
  checkIfThereIsLocalStorage,
  onClipboardClicked,
  saveFavoriteRecipeOnStorage,
  setHeartIcon } from '../services/supportFunctions';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import DrinkCarousel from '../components/DrinkCarousel';
import Footer from '../components/Footer';
import '../styles/recipeDetails.css';

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
  const [isRecipeFavorite, setRecipeToFavorite] = useState(false);

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

  useEffect(() => {
    setHeartIcon(setRecipeToFavorite, id);
  }, []);

  return (
    <div className="div-details-container">
      <h3>Recipe Details</h3>
      <div className="container-group">
        <div className="img-ingredients-container">
          <div className="img-container">
            <img
              className="recipe-img"
              src={ selectedMeal.strMealThumb }
              alt={ selectedMeal.strMealThumb }
              data-testid="recipe-photo"
            />
          </div>
          <ul className="li-container">
            <h1
              className="recipe-title"
              data-testid="recipe-title"
            >
              { selectedMeal.strMeal }
            </h1>
            <h2>Ingredientes:</h2>
            {
              arrayOfIngredientsAndMeasurements(selectedMeal).map((e, index) => (
                <li key={ index }>
                  {`${e[0]} - ${e[1]}`}
                </li>
              ))
            }
          </ul>
        </div>
        <div className="btns-container">
          <div
            type="button"
            data-testid="share-btn"
            onClick={ () => {
              const URL = history.location.pathname;
              onClipboardClicked(setClipboardState, URL);
            } }
          >
            {clipboardState
              ? <p>Copied to Clipboard!</p> : <img src={ shareIcon } alt="share" />}
          </div>
          <div
            type="button"
            data-testid="favorite-btn"
            src={ isRecipeFavorite ? 'blackHeartIcon' : 'whiteHeartIcon' }
            onClick={ () => {
              saveFavoriteRecipeOnStorage(selectedMeal, 'comida');
              setRecipeToFavorite(!isRecipeFavorite);
            } }
          >
            {isRecipeFavorite ? (
              <img src={ blackHeartIcon } alt="desfavoritar" />
            )
              : (<img src={ whiteHeartIcon } alt="favoritar" />) }
          </div>
        </div>
        <div className="content-container">
          <button
            data-testid="recipe-category"
            type="button"
            disabled
            className="btn btn-success"
          >
            { `Category: ${selectedMeal.strCategory}` }
          </button>
          <div className="instructions-container">
            <h3>Instructions: </h3>
            <p data-testid="instructions">{selectedMeal.strInstructions}</p>
          </div>
          <div className="video-container">
            {!selectedMeal.strYoutube
              ? (
                <img
                  src="https://t.ctcdn.com.br/18ygZuyQRBu5zLOsg7xGrShbtrs=/512x288/smart/i525197.png"
                  alt="vídeo não disponível"
                />
              )
              : (
                <ReactPlayer
                  data-testid="video"
                  url={ selectedMeal.strYoutube }
                />)}
          </div>
          <DrinkCarousel />
          <footer>
            { hasStartButton ? (
              <button
                data-testid="start-recipe-btn"
                className="btn btn-danger"
                type="button"
                onClick={ () => history.push(`/comidas/${id}/in-progress`) }
              >
                {alreadyStarted ? 'Continuar Receita' : 'Iniciar Receita'}
              </button>
            ) : null }
          </footer>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ScreenMealDetails;
