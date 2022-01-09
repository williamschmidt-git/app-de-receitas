import React, { useContext, useEffect, useHistory } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchMeals } from '../services/helpers';
import ApplicationContext from '../context/ApplicationContext';

const MAX_RECIPES = 11;

function ExploreRecipiesArea() {
  const { mealsArray, setMealsArray } = useContext(ApplicationContext);
  // const history = useHistory();

  const requestAPI = async () => {
    const responseAPI = await fetchMeals();
    setMealsArray(responseAPI.meals);
  };

  const recipesToRender = mealsArray
    .filter((meal, index) => index <= MAX_RECIPES && meal);

  useEffect(() => {
    requestAPI();
  }, []);

  return (
    <div>
      <Header pageName="Explorar Origem" />
      <div>
        <select
          data-testid="explore-by-area-dropdown"
        >
          {mealsArray.map((item) => (
            <option
              key={ item.strCategory }
              value={ item }
              data-testid={ `${item.strCategory}-option` }
            >
              { item }
            </option>
          ))}
        </select>
        {recipesToRender.map((recipe, index) => (
          <button
            type="button"
            key={ recipe.idMeal }
            data-testid={ `${index}-recipe-card` }
            name={ recipe.idMeal }
            // onClick={ ({ target }) => history.push(`/comidas/${target.name}`) }
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
      </div>
      <Footer />
    </div>
  );
}

export default ExploreRecipiesArea;
