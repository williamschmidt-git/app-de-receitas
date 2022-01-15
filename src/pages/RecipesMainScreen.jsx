import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ApplicationContext from '../context/ApplicationContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ButtonsMealsSearch from '../components/ButtonsMealsSearch';
import { fetchMeals } from '../services/helpers';
import '../styles/recipesMainScreen.css';

// const MAX_RECIPES = 11;

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
    ? recipesByMealsCategory
    : mealsArray;

  //     .filter((meal, index) => index <= MAX_RECIPES && meal)
  // .filter((meal, index) => index <= MAX_RECIPES && meal)

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
    <div className="screen-container">
      <Header pageName="Comidas" />
      <ButtonsMealsSearch />
      <div className="container-cards">
        <div
          className="card-group-container"
        >
          {recipesToRender.map((recipe, index) => (
            <div
              className="card"
              key={ recipe.idMeal }
            >
              <button
                className="card-btn"
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
                <div className="paragraph-container">
                  <p
                    className="p-recipe-title"
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
      </div>
      <Footer />
    </div>
  );
}

export default RecipesMainScreen;
