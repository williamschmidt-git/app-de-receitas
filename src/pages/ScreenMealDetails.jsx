import React, { useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import ApplicationContext from '../context/ApplicationContext';
import { fetchMealId, arrayOfIngredientsAndMeasurements, saveFavoriteRecipeOnStorage } from '../services/helpers';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import MealCarousel from '../components/DrinkCarousel';

function ScreenMealDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { selectedMeal, setSelectedMeal } = useContext(ApplicationContext);
  const searchId = async () => {
    const responseAPI = await fetchMealId(id);
    setSelectedMeal(responseAPI.meals[0]);
    localStorage.setItem('currentMeal', JSON.stringify(responseAPI.meals[0]));
  };

  useEffect(() => {
    searchId();
  }, []);

  console.log(selectedMeal);
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
      >
        <img src={ shareIcon } alt="share" />

      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => {
          saveFavoriteRecipeOnStorage(selectedMeal);
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
        {/* <p data-testid="instructions">{selectedMeal.strInstructions}</p> */}
      </div>
      <ReactPlayer data-testid="video" url={ selectedMeal.strYoutube } />
      {/* <MealCarousel /> */}
      <footer>
        <button
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => {
            history.push(`/comidas/${id}/in-progress`);
          } }
          className="button-start-recipe"
        >
          Iniciar Receita
        </button>
      </footer>
    </div>
  );
}

export default ScreenMealDetails;
