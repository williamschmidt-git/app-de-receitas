import React, { useContext, useEffect } from 'react';
import ApplicationContext from '../context/ApplicationContext';
import { fetchCategoriesMeals, fetchByMealCategory } from '../services/helpers';

const MAX_CATEGORIES = 4;

function ButtonsMealsSearch() {
  const { mealsCategory, setMealsCategory,
    setMealsRecipes,
    setArrayToRender, changeArrayToRender,
    mealSelected, setMealSelected } = useContext(ApplicationContext);

  const requestAPI = async () => {
    const responseAPI = await fetchCategoriesMeals();
    setMealsCategory(responseAPI.meals);
  };

  useEffect(() => {
    requestAPI();
  }, []);

  const requestByMealCategory = async (categoryName) => {
    const responseByCategoryName = await fetchByMealCategory(categoryName);
    setMealsRecipes(responseByCategoryName.meals);
    setMealSelected(categoryName);
  };

  const categoriesToRender = mealsCategory
    .filter(({ strCategory }, index) => index <= MAX_CATEGORIES && strCategory);

  return (
    <div className="btn-category-container">
      <button
        className="btn btn-danger"
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setArrayToRender(false) }
      >
        All
      </button>
      {categoriesToRender.map(({ strCategory }) => (
        <button
          className="btn btn-danger"
          type="button"
          key={ strCategory }
          name={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ ({ target }) => {
            if (target.name === mealSelected) {
              setArrayToRender(!changeArrayToRender);
            } else {
              requestByMealCategory(target.name);
            }
          } }
        >
          {strCategory}
        </button>
      ))}
    </div>
  );
}

export default ButtonsMealsSearch;
