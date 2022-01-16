/* eslint-disable react/jsx-max-depth */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { fetchDrinkId, arrayOfIngredientsAndMeasurements } from '../services/helpers';
import {
  onClipboardClicked,
  checkIfThereIsLocalStorage,
  saveFavoriteRecipeOnStorage,
  setHeartIcon } from '../services/supportFunctions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import unavailableVideo from '../images/unavailableVideo.png';
import ApplicationContext from '../context/ApplicationContext';
import '../App.css';
import MealCarousel from '../components/MealCarousel';
import '../styles/recipeDetails.css';
import Footer from '../components/Footer';

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
  const [isRecipeFavorite, setRecipeToFavorite] = useState(false);

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

  useEffect(() => {
    setHeartIcon(setRecipeToFavorite, id);
  }, []);

  return (
    <div className="div-details-container">
      <h3 className="page-title">Recipe Details</h3>
      <div className="container-group">
        <div className="img-ingredients-container">
          <div className="title-ingredients-container">
            <h1
              className="recipe-title"
              data-testid="recipe-title"
            >
              { selectedDrink.strDrink }
            </h1>
            <h2 id="ingredients">Ingredients:</h2>
            <ul className="ul">
              {
                arrayOfIngredientsAndMeasurements(selectedDrink).map((e, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${e[0]} - ${e[1]}`}
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="img-container">
            <img
              className="recipe-img"
              src={ selectedDrink.strDrinkThumb }
              alt={ selectedDrink.srtDrink }
              data-testid="recipe-photo"
            />
          </div>
        </div>
        <div className="btns-container">
          <div
            className="icon"
            data-testid="share-btn"
            onClick={ () => {
              const URL = history.location.pathname;
              onClipboardClicked(setClipboardState, URL);
            } }
          >
            {clipboardState
              ? <p>Link Copied to Clipboard!</p>
              : (
                <img className="share-icon" src={ shareIcon } alt="share" />
              )}
          </div>
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
              <img className="favorite-icon" src={ blackHeartIcon } alt="unfavorite" />
            )
              : (
                <img
                  className="favorite-icon"
                  src={ whiteHeartIcon }
                  alt="favorite"
                />) }
          </div>
        </div>
        <div className="content-container">
          <button
            data-testid="recipe-category"
            type="button"
            disabled
            className="btn btn-primary"
          >
            { `Category ${selectedDrink.strCategory} - ${selectedDrink.strAlcoholic}` }
          </button>
          <div className="instructions-container">
            <h3>Instructions: </h3>
            <p data-testid="instructions">{selectedDrink.strInstructions}</p>
          </div>
          <div className="video-container">
            {!selectedDrink.strYoutube
              ? (
                <img
                  className="video-img"
                  src={ unavailableVideo }
                  alt="Video unavailable"
                />
              )
              : (
                <ReactPlayer
                  data-testid="video"
                  url={ selectedDrink.strYoutube }
                />)}
          </div>
          <MealCarousel />
          <footer>
            { hasStartButton ? (
              <button
                data-testid="start-recipe-btn"
                className="btn btn-danger"
                type="button"
                onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
              >
                {alreadyStarted ? 'Continue Recipe' : 'Start Recipe'}
              </button>
            ) : null }
          </footer>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ScreenDrinkDetails;
