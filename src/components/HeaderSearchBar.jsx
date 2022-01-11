import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ApplicationContext from '../context/ApplicationContext';
import {
  fetchMealsIngredients,
  fetchMealsName,
  fetchMealsFirstLetter,
  fetchDrinksIngredients,
  fetchDrinksName,
  fetchDrinksFirstLetter,
} from '../services/helpers';

const NULL_RESPONSE = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

function HeaderSearchBar() {
  const { setMealsArray, setDrinksArray } = useContext(ApplicationContext);
  const [typedText, setTypedText] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('');
  const history = useHistory();

  const { location: { pathname } } = history;

  const meals = {
    ingredient: fetchMealsIngredients,
    name: fetchMealsName,
    firstLetter: fetchMealsFirstLetter,
  };

  const drinks = {
    ingredient: fetchDrinksIngredients,
    name: fetchDrinksName,
    firstLetter: fetchDrinksFirstLetter,
  };

  const mealsRequest = async () => {
    const isFirstLetter = selectedRadio === 'firstLetter';
    const invalidLength = typedText.length > 1;
    if (isFirstLetter && invalidLength) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const responseAPI = await meals[selectedRadio](typedText);
    if (responseAPI.meals === null) {
      return global.alert(NULL_RESPONSE);
    }
    if (responseAPI.meals.length === 1) {
      const mealID = responseAPI.meals[0].idMeal;
      return history.push(`/comidas/${mealID}`);
    }
    setMealsArray(responseAPI.meals);
  };

  const drinksRequest = async () => {
    const isFirstLetter = selectedRadio === 'firstLetter';
    const invalidLength = typedText.length > 1;
    if (isFirstLetter && invalidLength) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const responseAPI = await drinks[selectedRadio](typedText);
    if (responseAPI.drinks === null) {
      return global.alert(NULL_RESPONSE);
    }
    if (responseAPI.drinks.length === 1) {
      const drinkID = responseAPI.drinks[0].idDrink;
      return history.push(`/bebidas/${drinkID}`);
    }
    setDrinksArray(responseAPI.drinks);
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
      <label htmlFor="ingredient" style={ { color: 'white' } }>
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
      <label htmlFor="name" style={ { color: 'white' } }>
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
      <label htmlFor="firstLetter" style={ { color: 'white' } }>
        Primeira Letra:
        <input
          type="radio"
          id="firstLetter"
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
