import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDrinkIngredients, fetchDrinksByIngredient } from '../services/helpers';
import ApplicationContext from '../context/ApplicationContext';

const MAX_INGREDIENTS = 11;

function ExploreDrinksIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setIngredientExplored } = useContext(ApplicationContext);

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
          data-testid={ `${index}-ingredient-card` }
          key={ index }
          onClick={ async () => {
            const responseAPI = await fetchDrinksByIngredient(item.strIngredient1);
            setIngredientExplored(responseAPI.drinks);
            history.push('/bebidas');
          } }
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
