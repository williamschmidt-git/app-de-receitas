import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import DoneMeals from '../components/DoneMeals';
import { checkIfThereIsLocalStorage } from '../services/supportFunctions';

function RecipesDone() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    setMeals(checkIfThereIsLocalStorage('doneRecipes'));
  }, []);

  const arrayToRender = ({ name }) => {
    const typeOfFilter = {
      Food: 'comida',
      Drinks: 'bebida',
    };
    if (name !== 'All') {
      const filteredArray = meals.filter((item) => item.type === typeOfFilter[name]);
      return setMeals(filteredArray);
    }
    setMeals(checkIfThereIsLocalStorage('doneRecipes'));
  };

  return (
    <div>
      <Header pageName="Receitas Feitas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        name="All"
        onClick={ ({ target }) => arrayToRender(target) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        name="Food"
        onClick={ ({ target }) => arrayToRender(target) }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="Drinks"
        onClick={ ({ target }) => arrayToRender(target) }
      >
        Drinks
      </button>
      <DoneMeals meals={ meals } />
    </div>
  );
}

export default RecipesDone;
