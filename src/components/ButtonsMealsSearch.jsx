import React, { useContext, useEffect } from 'react';
import ApplicationContext from '../context/ApplicationContext';
import { fetchCategoriesMeals } from '../services/helpers';

const MAX_CATEGORIES = 4;

function ButtonsMealsSearch() {
  const { mealsCategory, setMealsCategory } = useContext(ApplicationContext);

  const requestAPI = async () => {
    const responseAPI = await fetchCategoriesMeals();
    setMealsCategory(responseAPI.meals);
  };

  useEffect(() => {
    requestAPI();
  }, []);

  const categoriesToRender = mealsCategory
    .filter(({ strCategory }, index) => index <= MAX_CATEGORIES && strCategory);

  return (
    <div>
      {categoriesToRender.map(({ strCategory }) => (
        <button
          type="button"
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ ({ target }) => console.log(target) }
        >
          {strCategory}
        </button>
      ))}
    </div>
  );
}

export default ButtonsMealsSearch;
