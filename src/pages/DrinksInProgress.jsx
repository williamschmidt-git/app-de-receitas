import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDrinkId } from '../services/helpers';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DrinksInProgress() {
  const [selectedDrink, setSelectedDrink] = useState([]);
  const { id } = useParams();

  const searchId = async () => {
    const responseAPI = await fetchDrinkId(id);
    setSelectedDrink(responseAPI.drinks[0]);
  };

  useEffect(() => {
    searchId();
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

  const arrayOfIngredientsAndMeasurements = splicedArrayIngredients
    .reduce((acc, curr, index) => {
      acc.push(curr.concat(splicedArrayMeasurements[index]));
      return acc;
    }, []);

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
          arrayOfIngredientsAndMeasurements.map((ingredient, index) => {
            return (
              <div
                key={ index }
              >
                <input type="checkbox" />
              &nbsp;
                <span
                  data-testid={ `data-testid=${index}-ingredient-step` }
                >
                  {`${ingredient[0]} - ${ingredient[1]}`}
                </span>
              </div>
            );
          })
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
        // onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default DrinksInProgress;
