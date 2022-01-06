import React, { useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import ApplicationContext from '../context/ApplicationContext';
import { fetchMealId } from '../services/helpers';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import DrinkCarousel from '../components/DrinkCarousel';

function ScreenMealDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { selectedMeal, setSelectedMeal } = useContext(ApplicationContext);
  const searchId = async () => {
    const responseAPI = await fetchMealId(id);
    setSelectedMeal(responseAPI.meals[0]);
  };

  useEffect(() => {
    searchId();
  }, []);

  const ingredientsArray = Object.entries(selectedMeal)
    .filter((keyName) => keyName[0].includes('strIngredient'))
    .filter((i) => !i.includes(''))
    .filter((j) => !j.includes(null));

  const measureArray = Object.entries(selectedMeal)
    .filter((keyName) => keyName[0].includes('strMeasure'))
    .filter((i) => !i.includes(''))
    .filter((j) => !j.includes(null))
    .filter((k) => !k.includes(' '));

  const splicedArrayIngredients = ingredientsArray.map((e) => e.splice(1, 1));

  const splicedArrayMeasurements = measureArray.map((e) => e.splice(1, 1));

  const arrayOfIngredientsAndMeasurements = splicedArrayIngredients
    .reduce((acc, curr, index) => {
      acc.push(curr.concat(splicedArrayMeasurements[index]));
      return acc;
    }, []);

  console.log(arrayOfIngredientsAndMeasurements);

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
      >
        <img src={ whiteHeartIcon } alt="favorite" />

      </button>
      <h3>Recipe:</h3>
      <div>
        {
          arrayOfIngredientsAndMeasurements.map((e, index) => (
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
        <button
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => history.push(`/comidas/${id}/in-progress`) }
          className="button-start-recipe"
        >
          Iniciar Receita
        </button>
      </footer>
    </div>
  );
}

export default ScreenMealDetails;
