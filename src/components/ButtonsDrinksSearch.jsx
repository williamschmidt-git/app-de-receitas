import React, { useContext, useEffect } from 'react';
import ApplicationContext from '../context/ApplicationContext';
import { fetchCategoriesDrinks, fetchByDrinkCategory } from '../services/helpers';

const MAX_CATEGORIES = 4;

function ButtonsDrinksSearch() {
  const { drinksCategory, setDrinksArray, setDrinksCategory } = useContext(ApplicationContext);

  const requestAPI = async () => {
    const responseAPI = await fetchCategoriesDrinks();
    setDrinksCategory(responseAPI.drinks);
  };

  useEffect(() => {
    requestAPI();
  }, []);

  const categoriesToRender = drinksCategory
    .filter((drinkCategory, index) => index <= MAX_CATEGORIES && drinkCategory);

  const requestByDrinkCategory = async (categoryName) => {
    const responseByCategoryName = await fetchByDrinkCategory(categoryName);
    console.log(responseByCategoryName);
    setDrinksArray(responseByCategoryName.drinks);
  };

  return (
    <div>
      {categoriesToRender.map(({ strCategory }) => (
        <button
          type="button"
          key={ strCategory }
          name={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ ({ target }) => requestByDrinkCategory(target.name) }
        >
          { strCategory }
        </button>
      ))}
    </div>
  );
}

export default ButtonsDrinksSearch;
