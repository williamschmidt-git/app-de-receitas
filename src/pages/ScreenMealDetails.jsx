import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMealId } from '../services/helpers';

function ScreenMealDetails() {
  const { id } = useParams();
  const searchId = async () => {
    const responseAPI = await fetchMealId(id);
    return responseAPI;
  };

  useEffect(() => {
    searchId();
  }, []);

  return (
    <div>
      MEAL DETAILS
    </div>
  );
}

export default ScreenMealDetails;

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
