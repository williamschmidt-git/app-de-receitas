import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchMealsArea, fetchByArea } from '../services/helpers';

const MAX_RECIPES = 11;

function ExploreRecipesByArea() {
  const [area, setArea] = useState([]);
  const [recipesByArea, setRecipesByArea] = useState([]);
  const [hasButtonAll, setButtonAll] = useState(false);
  const history = useHistory();

  const requestAPI = async () => {
    const responseAPI = await fetchMealsArea();
    setArea(responseAPI.meals);
  };

  const requestByArea = async (value) => {
    const responseAPI = await fetchByArea(value);
    const twelveRecipes = responseAPI.meals
      .filter((recipe, index) => index <= MAX_RECIPES && recipe);
    setRecipesByArea(twelveRecipes);
    setButtonAll(true);
  };

  useEffect(() => {
    requestAPI();
    requestByArea('American');
  }, []);

  return (
    <div>
      <Header pageName="Explorar Origem" />
      <div>
        <select
          style={ { display: 'block' } }
          data-testid="explore-by-area-dropdown"
          onChange={ ({ target }) => requestByArea(target.value) }
        >
          {hasButtonAll ? (
            <option data-testid="All-option">All</option>)
            : null}
          {area.map((recipe, index) => (
            <option
              data-testid={ `${recipe.strArea}-option` }
              key={ index }
            >
              {recipe.strArea}
            </option>
          ))}
        </select>
        {recipesByArea.map((recipe, index) => (
          <button
            style={ { display: 'block' } }
            type="button"
            key={ recipe.idMeal }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`/comidas/${recipe.idMeal}`) }
          >
            <div>
              <img
                style={ { width: '50px', height: '50px' } }
                src={ recipe.strMealThumb }
                alt="Meal"
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>
                { recipe.strMeal }
              </p>
            </div>
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreRecipesByArea;
