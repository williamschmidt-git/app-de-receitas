import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ApplicationContext from '../context/ApplicationContext';
import Footer from '../components/Footer';
import Header from '../components/Header';

const MAX_RECIPES = 11;

function RecipesMainScreen() {
  const history = useHistory();
  const { mealsArray } = useContext(ApplicationContext);
  const recipesToRender = mealsArray
    .filter((meal, index) => index <= MAX_RECIPES && meal);
  return (
    <div>
      <Header pageName="Comidas" />
      {recipesToRender.map((recipe, index) => (
        <button
          type="button"
          key={ recipe.idMeal }
          data-testid={ `${index}-recipe-card` }
          name={ recipe.idMeal }
          onClick={ ({ target }) => history.push(`/comidas/${target.name}`) }
        >
          <img
            style={ { height: '50px', width: '50px' } }
            src={ recipe.strMealThumb }
            name={ recipe.idMeal }
            alt="Meal"
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
            name={ recipe.idMeal }
          >
            {recipe.strMeal}
          </p>
        </button>
      ))}
      <Footer />
    </div>
  );
}

export default RecipesMainScreen;
