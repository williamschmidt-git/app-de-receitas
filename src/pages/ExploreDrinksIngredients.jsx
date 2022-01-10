/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDrinkIngredients } from '../services/helpers';

const MAX_INGREDIENTS = 11;

function ExploreDrinksIngredients() {
  const [ingredients, setIngredients] = useState([]);

  const history = useHistory();

  const ingredientsToRender = ingredients
    .filter((drink, index) => index <= MAX_INGREDIENTS && drink);

  const requestIngredients = async () => {
    const responseAPI = await fetchDrinkIngredients();
    setIngredients(responseAPI.drinks);
  };

  useEffect(() => {
    requestIngredients();
  }, []);

  return (
    <div>
      <Header pageName="Explorar Ingredientes" />
      {ingredientsToRender.map((item, index) => (
        <button
          type="button"
          onClick={ () => history.push('/bebidas') }
          data-testid={ `${index}-ingredient-card ` }
          key={ index }
        >
          <div>
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
              alt="ingredient"
              data-testid={ `${index}-card-img` }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              {item.strIngredient1}
            </p>
          </div>
        </button>
      ))}
      <Footer />
    </div>
  );
}

export default ExploreDrinksIngredients;
