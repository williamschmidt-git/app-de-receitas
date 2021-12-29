import React, { useContext } from 'react';
import ApplicationContext from '../context/ApplicationContext';
import Footer from '../components/Footer';
import Header from '../components/Header';

const MAX_RECIPES = 11;

function RecipesMainScreen() {
  const { mealsArray } = useContext(ApplicationContext);
  const recipesToRender = mealsArray
    .filter((meal, index) => index <= MAX_RECIPES && meal);
  return (
    <div>
      <Header pageName="Comidas" />
      {recipesToRender.map((recipe, index) => (
        <div key={ recipe.idMeal } data-testid={ `${index}-recipe-card` }>
          <img
            src={ recipe.strMealThumb }
            alt="Meal"
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default RecipesMainScreen;
