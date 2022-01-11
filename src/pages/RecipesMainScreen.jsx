import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ApplicationContext from '../context/ApplicationContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ButtonsMealsSearch from '../components/ButtonsMealsSearch';
import { fetchMeals } from '../services/helpers';

const MAX_RECIPES = 11;

function RecipesMainScreen() {
  const history = useHistory();
  const {
    mealsArray,
    setMealsArray,
    recipesByMealsCategory,
    setArrayToRender,
    changeArrayToRender,
    exploreByIngredients,
    setIngredientExplored } = useContext(ApplicationContext);
  const recipesToRender = changeArrayToRender
    ? recipesByMealsCategory.filter((meal, index) => index <= MAX_RECIPES && meal)
    : mealsArray.filter((meal, index) => index <= MAX_RECIPES && meal);

  const requestAPI = async () => {
    const responseAPI = await fetchMeals();
    setMealsArray(responseAPI.meals);
  };

  useEffect(() => {
    if (exploreByIngredients.length === 0) {
      requestAPI();
    } else {
      setMealsArray(exploreByIngredients);
    }
  }, []);

  useEffect(() => {
    if (recipesByMealsCategory.length === 0) {
      setArrayToRender(false);
    } else {
      setArrayToRender(true);
    }
  }, [recipesByMealsCategory]);

  useEffect(() => () => setIngredientExplored([]), []);

  return (
    <div>
      <Header pageName="Comidas" />
      <ButtonsMealsSearch />
      <div
        className="card-group div-card"
      >
        {recipesToRender.map((recipe, index) => (
          <div
            key={ recipe.idMeal }
            className="card"
          >
            <button
              className="card text-white bg-danger mb-3"
              type="button"
              data-testid={ `${index}-recipe-card` }
              name={ recipe.idMeal }
              onClick={ ({ target }) => history.push(`/comidas/${target.name}`) }
            >
              <img
                className="card-img-top"
                src={ recipe.strMealThumb }
                name={ recipe.idMeal }
                alt="Meal"
                data-testid={ `${index}-card-img` }
              />
              <div className="card-body">
                <p
                  className="card-text"
                  data-testid={ `${index}-card-name` }
                  name={ recipe.idMeal }
                >
                  {recipe.strMeal}
                </p>
              </div>
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default RecipesMainScreen;
