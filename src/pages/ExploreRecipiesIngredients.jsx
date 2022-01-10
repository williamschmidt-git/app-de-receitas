import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchMealIngredients } from '../services/helpers';

const MAX_INGREDIENTS = 11;

function ExploreRecipiesIngredients() {
  const [ingredients, setIngredients] = useState([]);

  const history = useHistory();

  const ingredientsToRender = ingredients
    .filter((meal, index) => index <= MAX_INGREDIENTS && meal);

  const requestIngredients = async () => {
    const responseAPI = await fetchMealIngredients();
    setIngredients(responseAPI.meals);
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
          onClick={ () => history.push('/comidas') }
          key={ index }
          data-testid={ `${index}-ingredient-card ` }
        >
          <div>
            <img
              src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
              alt="ingredient"
              data-testid={ `${index}-card-img` }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              {item.strIngredient}
            </p>
          </div>
        </button>
      ))}
      <Footer />
    </div>
  );
}

export default ExploreRecipiesIngredients;
