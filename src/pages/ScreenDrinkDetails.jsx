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

  console.log(Object.entries(selectedDrink).filter((keyName) => keyName[0].includes('strIngredient')));

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
      <h4 data-testid="recipe-category">{ selectedDrink.strCategory }</h4>
      {/* {console.log(Object.entries(selectedDrink))} */}
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
