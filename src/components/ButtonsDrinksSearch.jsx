import React, { useContext, useEffect } from 'react';
import ApplicationContext from '../context/ApplicationContext';
import { fetchCategoriesDrinks } from '../services/helpers';

const MAX_CATEGORIES = 4;

function ButtonsDrinksSearch() {
  const { drinksCategory, setDrinksCategory } = useContext(ApplicationContext);

  const requestAPI = async () => {
    const responseAPI = await fetchCategoriesDrinks();
    setDrinksCategory(responseAPI.drinks);
  };

  useEffect(() => {
    requestAPI();
  }, []);

  const categoriesToRender = drinksCategory
    .filter((drinkCategory, index) => index <= MAX_CATEGORIES && drinkCategory);

  return (
    <div>
      {categoriesToRender.map(({ strCategory }) => (
        <button
          type="button"
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ ({ target }) => console.log(target) }
        >
          { strCategory }
        </button>
      ))}
    </div>
  );
}

export default ButtonsDrinksSearch;
