import React, { useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { fetchDrinkId,
  arrayOfIngredientsAndMeasurements,
  saveFavoriteRecipeOnStorage } from '../services/helpers';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import ApplicationContext from '../context/ApplicationContext';
import '../App.css';
import MealCarousel from '../components/MealCarousel';

function ScreenDrinkDetails() {
  const history = useHistory();
  const { selectedDrink, setSelectedDrink } = useContext(ApplicationContext);
  const { id } = useParams();

  const searchId = async () => {
    const responseAPI = await fetchDrinkId(id);
    setSelectedDrink(responseAPI.drinks[0]);
    localStorage.setItem('currentDrink', JSON.stringify(responseAPI.drinks[0]));
  };

  useEffect(() => {
    searchId();
  }, []);

  console.log(selectedDrink);

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
        onClick={ () => {
          copy(`http://localhost:3000/bebidas/${id}`);
          global.alert('Link copiado!');
        } }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => {
          saveFavoriteRecipeOnStorage(selectedDrink, 'bebida');
        } }
      >
        <img src={ whiteHeartIcon } alt="favorite" />
      </button>
      <h3>Ingredientes:</h3>
      <div>
        {
          arrayOfIngredientsAndMeasurements(selectedDrink).map((e, index) => (
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

      <h4
        data-testid="recipe-category"
      >
        { `${selectedDrink.strCategory} - ${selectedDrink.strAlcoholic}` }
      </h4>
      <div>
        <h3>Instructions: </h3>
        {/* <p data-testid="instructions">{selectedDrink.strInstructions}</p> */}
      </div>
      {/* <MealCarousel /> */}
      <footer>
        <button
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
          className="button-start-recipe"
        >
          Iniciar Receita
        </button>
        {/* <button
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
          className="button-start-recipe"
        >
          Continuar Receita
        </button> */}
      </footer>
    </div>
  );
}

export default ScreenDrinkDetails;
