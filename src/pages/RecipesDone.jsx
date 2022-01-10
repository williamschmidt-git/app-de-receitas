import React from 'react';
import Header from '../components/Header';
import DoneMeals from '../components/DoneMeals';
import DoneDrinks from '../components/DoneDrinks';

// const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

function RecipesDone() {
  return (
    <div>
      <Header pageName="Receitas Feitas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <DoneMeals />
      <DoneDrinks />
    </div>
  );
}

export default RecipesDone;
