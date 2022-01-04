import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDrinkId } from '../services/helpers';

function ScreenDrinkDetails() {
  const [selectedDrink, setSelectedDrink] = useState([]);
  const { id } = useParams();
  const searchId = async () => {
    const responseAPI = await fetchDrinkId(id);
    console.log(responseAPI.drinks[0]);
    setSelectedDrink(responseAPI.drinks[0]);
  };

  useEffect(() => {
    searchId();
  }, []);

  const ingredientsArray = Object.entries(selectedDrink)
    .filter((keyName) => keyName[0].includes('strIngredient'))
    .filter((i) => !i.includes(null));

  const measureArray = Object.entries(selectedDrink)
    .filter((keyName) => keyName[0].includes('strMeasure'))
    .filter((i) => !i.includes(null));

  console.log(ingredientsArray, measureArray);

  // const newArray = ingredientsArray.map((e, index) => e.concat(measureArray[index]));
  // console.log(newArray);

  const splicedArrayIngredients = ingredientsArray.map((e) => e.splice(1, 1));

  const splicedArrayMeasurements = measureArray.map((e) => e.splice(1, 1));
  // console.log(splicedArrayMeasurements);

  const arrayOfIngredientsAndMeasurements = splicedArrayIngredients.reduce((acc, curr, index) => {
    acc.push(curr.concat(splicedArrayMeasurements[index]));
    return acc;
  }, []);
  console.log(arrayOfIngredientsAndMeasurements);

  return (
    <div>
      <img
        src={ selectedDrink.strDrinkThumb }
        alt={ selectedDrink.srtDrink }
        data-testid="recipe-photo"
        style={ { width: '40px', height: '40px' } }
      />
      <h1 data-testid="recipe-title">{ selectedDrink.srtDrink }</h1>
      <button
        type="button"
        data-testid="share-btn"
      >
        SHARE

      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        FAVORITE

      </button>
      <h3>Recipe:</h3>
      <div>
        {
          arrayOfIngredientsAndMeasurements.map((e, index) => (
            <div key={ index }>
              <p data-testid={ `${index}-ingredient-name-and-measure` }>{`${e[0]} - ${e[1]}`}</p>
            </div>
          ))
        }
      </div>

      <h4 data-testid="recipe-category">{ selectedDrink.strCategory }</h4>
      <div>
        <h3>Instructions: </h3>
        <p data-testid="instructions">{selectedDrink.strInstructions}</p>
      </div>
      {/* {console.log(Object.entries(selectedDrink))} */}
      {/* <button data-testid="start-recipe-btn" type="button">
        Start Recipe
      </button> */}
    </div>
  );
}

export default ScreenDrinkDetails;

// data-testid="recipe-photo"
// data-testid="recipe-title"
// data-testid="share-btn"
// data-testid="favorite-btn"
// data-testid="recipe-category"
// data-testid="${index}-ingredient-name-and-measure"
// data-testid="instructions"
// data-testid="video"
// data-testid="${index}-recomendation-card"
// data-testid="start-recipe-btn"
