import React, { useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchDrinkId } from '../services/helpers';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import MealCarousel from '../components/MealCarousel';
import ApplicationContext from '../context/ApplicationContext';
import '../App.css';

function ScreenDrinkDetails() {
  const history = useHistory();
  const { selectedDrink, setSelectedDrink } = useContext(ApplicationContext);
  const { id } = useParams();
  const inProgressRecipes = localStorage.getItem('inProgressRecipes');
  let parseProgressRecipes = JSON.parse(inProgressRecipes);

  const searchId = async () => {
    const responseAPI = await fetchDrinkId(id);
    setSelectedDrink(responseAPI.drinks[0]);
    localStorage.setItem('currentDrink', JSON.stringify(responseAPI.drinks[0]));
  };

  useEffect(() => {
    const drinkRecipe = localStorage.getItem('currentDrink');
    const parseRecipe = JSON.parse(drinkRecipe);
    if (!parseRecipe || parseRecipe.idDrink !== id) {
      searchId();
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

  const arrayOfIngredientsAndMeasurements = splicedArrayIngredients
    .reduce((acc, curr, index) => {
      acc.push(curr.concat(splicedArrayMeasurements[index]));
      return acc;
    }, []);

  const startRecipe = () => {
    // if (!parseProgressRecipes) {
    //   parseProgressRecipes = {
    //     cocktails: {
    //       [id]: [...arrayOfIngredientsAndMeasurements],
    //     },
    //     meals: {},
    //   };
    // } else {
    //   arrayOfIngredientsAndMeasurements.filter((_array, index) => index);
    //   console.log(arrayOfIngredientsAndMeasurements)
    //   parseProgressRecipes.cocktails[id] = [...arrayOfIngredientsAndMeasurements];
    // }
    // localStorage.setItem('inProgressRecipes', JSON.stringify(parseProgressRecipes));
    history.push(`/bebidas/${id}/in-progress`);
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

      <h4
        data-testid="recipe-category"
      >
        { `${selectedDrink.strCategory} - ${selectedDrink.strAlcoholic}` }
      </h4>
      <div>
        <h3>Instructions: </h3>
        <p data-testid="instructions">{selectedDrink.strInstructions}</p>
      </div>
      <MealCarousel />
      <footer>
        <button
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => startRecipe() }
          className="button-start-recipe"
        >
          Iniciar Receita
        </button>
      </footer>
    </div>
  );
}

export default ScreenDrinkDetails;
