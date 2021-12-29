import React, { useContext, useEffect } from 'react';
import ApplicationContext from '../context/ApplicationContext';
import { fetchCategoriesMeals, fetchByMealCategory } from '../services/helpers';

const MAX_CATEGORIES = 4;

function ButtonsMealsSearch() {
  const { mealsCategory,
    setMealsCategory, setMealsArray } = useContext(ApplicationContext);

  const requestAPI = async () => {
    const responseAPI = await fetchCategoriesMeals();
    setMealsCategory(responseAPI.meals);
  };

  useEffect(() => {
    requestAPI();
  }, []);

  const requestByMealCategory = async (categoryName) => {
    const responseByCategoryName = await fetchByMealCategory(categoryName);
    console.log(responseByCategoryName);
    setMealsArray(responseByCategoryName.meals);
  };

  const categoriesToRender = mealsCategory
    .filter(({ strCategory }, index) => index <= MAX_CATEGORIES && strCategory);

  return (
    <div>
      {categoriesToRender.map(({ strCategory }) => (
        <button
          type="button"
          key={ strCategory }
          name={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ ({ target }) => requestByMealCategory(target.name) }
        >
          {strCategory}
        </button>
      ))}
    </div>
  );
}

export default ButtonsMealsSearch;
