import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  fetchMealsIngredients,
  fetchMealsName,
  fetchMealsFirstLetter,
  fetchDrinksIngredients,
  fetchDrinksName,
  fetchDrinksFirstLetter,
} from '../services/helpers';

function HeaderSearchBar() {
  const [typedText, setTypedText] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('');
  const { location: { pathname } } = useHistory();

  const mealsRequest = () => {
    if (selectedRadio === 'ingredient') {
      return fetchMealsIngredients(typedText);
    }
    if (selectedRadio === 'name') {
      return fetchMealsName(typedText);
    }
    if (selectedRadio === 'first-letter') {
      if (typedText.length > 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      return fetchMealsFirstLetter(typedText);
    }
  };

  const drinksRequest = () => {
    if (selectedRadio === 'ingredient') {
      return fetchDrinksIngredients(typedText);
    }
    if (selectedRadio === 'name') {
      return fetchDrinksName(typedText);
    }
    if (selectedRadio === 'first-letter') {
      if (typedText.length > 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      return fetchDrinksFirstLetter(typedText);
    }
  };

  const handleClick = () => {
    if (pathname === '/comidas') return mealsRequest();
    if (pathname === '/bebidas') return drinksRequest();
  };

  const handleChange = ({ target }) => {
    const { value, type, id } = target;
    if (type === 'text') {
      setTypedText(value);
    }
    if (type === 'radio') {
      setSelectedRadio(id);
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        value={ typedText }
        onChange={ (event) => handleChange(event) }
      />
      <label htmlFor="ingredient">
        Ingrediente:
        <input
          type="radio"
          id="ingredient"
          name="search-radio"
          data-testid="ingredient-search-radio"
          value={ selectedRadio }
          onClick={ (event) => handleChange(event) }
        />
      </label>
      <label htmlFor="name">
        Nome:
        <input
          type="radio"
          id="name"
          name="search-radio"
          data-testid="name-search-radio"
          value={ selectedRadio }
          onClick={ (event) => handleChange(event) }
        />
      </label>
      <label htmlFor="first-letter">
        Primeira Letra:
        <input
          type="radio"
          id="first-letter"
          name="search-radio"
          data-testid="first-letter-search-radio"
          value={ selectedRadio }
          onClick={ (event) => handleChange(event) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleClick() }
      >
        Buscar
      </button>
    </div>
  );
}

export default HeaderSearchBar;
