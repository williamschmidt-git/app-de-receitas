import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDrinkId, arrayOfIngredientsAndMeasurements } from '../services/helpers';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import ApplicationContext from '../context/ApplicationContext';

function DrinksInProgress() {
  const { selectedDrink, setSelectedDrink } = useContext(ApplicationContext);
  const { id } = useParams();

  const searchId = async () => {
    const responseAPI = await fetchDrinkId(id);
    setSelectedDrink(responseAPI.drinks[0]);
  };

  useEffect(() => {
    searchId();
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
          arrayOfIngredientsAndMeasurements(selectedDrink).map((ingredient, index) => (
            <div
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
              />
            &nbsp;
              <span>
                {`${ingredient[0]} - ${ingredient[1]}`}
              </span>
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
