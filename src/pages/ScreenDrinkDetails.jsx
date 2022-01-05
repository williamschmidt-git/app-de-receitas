import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDrinkId } from '../services/helpers';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import MealCarousel from '../components/MealCarousel';

function ScreenDrinkDetails() {
  const [selectedDrink, setSelectedDrink] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  const searchId = async () => {
    const responseAPI = await fetchDrinkId(id);
    setSelectedDrink(responseAPI.drinks[0]);
    localStorage.setItem('inProgressRecipes', JSON.stringify(responseAPI.drinks[0]));
  };

  useEffect(() => {
    const drinkRecipe = localStorage.getItem('inProgressRecipes');
    const parseRecipe = JSON.parse(drinkRecipe);
    if (!parseRecipe || !parseRecipe.idDrink !== id) {
      searchId();
    } else {
      setSelectedDrink(parseRecipe);
    }
  }, []);

  const ingredientsArray = Object.entries(selectedDrink)
    .filter((keyName) => keyName[0].includes('strIngredient'))
    .filter((ingredient) => !ingredient.includes(null))
    .filter((ingredient) => !ingredient.includes(''))
    .filter((ingredient) => !ingredient.includes(' '));

  const measureArray = Object.entries(selectedDrink)
    .filter((keyName) => keyName[0].includes('strMeasure'))
    .filter((ingredient) => !ingredient.includes(null))
    .filter((ingredient) => !ingredient.includes(''))
    .filter((ingredient) => !ingredient.includes(' '));

  const splicedArrayIngredients = ingredientsArray.map((e) => e.splice(1, 1));

  const splicedArrayMeasurements = measureArray.map((e) => e.splice(1, 1));

  const arrayOfIngredientsAndMeasurements = () => {
    const arrayToRender = splicedArrayIngredients
      .reduce((acc, curr, index) => {
        acc.push(curr.concat(splicedArrayMeasurements[index]));
        return acc;
      }, []);
    localStorage.setItem('arrayOfIngredientsAndMeasurements',
      JSON.stringify(arrayToRender));
    return arrayToRender;
  };

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
      >
        <img src={ shareIcon } alt="share" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        <img src={ whiteHeartIcon } alt="favorite" />
      </button>
      <h3>Ingredientes:</h3>
      <div>
        {
          arrayOfIngredientsAndMeasurements().map((e, index) => (
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
      <h4 data-testid="recipe-category">{ selectedDrink.strCategory }</h4>
      <div>
        <h3>Instructions: </h3>
        <p data-testid="instructions">{selectedDrink.strInstructions}</p>
      </div>
      <button
        data-testid="start-recipe-btn"
        type="button"
        onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
      >
        Iniciar Receita
      </button>
    </div>
  );
}

export default ScreenDrinkDetails;
