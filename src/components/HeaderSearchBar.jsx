import React, { useContext } from 'react';
import { fetchMealsFirstLetter,
  fetchMealsIngredients,
  fetchMealsName } from '../services/fetchMeals';
import MealsContext from '../context/MealsContext';

function HeaderSearchBar() {
  const { searchInput, setSearchInput } = useContext(MealsContext);

  const handleClick = ({ target }) => {
    if (target.checked && target.name === 'ingredients') {
      return fetchMealsIngredients();
    }
    if (target.checked && target.name === 'name') {
      return fetchMealsName();
    }
    if (target.checked && target.name === 'first-letter') {
      return fetchMealsFirstLetter();
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ handleChange }
      />
      <label htmlFor="ingredient">
        Ingrediente:
        <input
          type="radio"
          id="ingredient"
          name="ingredient"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name">
        Nome:
        <input
          type="radio"
          id="name"
          name="name"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter">
        Primeira Letra:
        <input
          type="radio"
          id="first-letter"
          name="first-letter"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleClick() }
      >
        Pesquisar
      </button>
    </div>
  );
}

export default HeaderSearchBar;
