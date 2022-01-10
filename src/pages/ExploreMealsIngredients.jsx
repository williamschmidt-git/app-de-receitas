import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ApplicationContext from '../context/ApplicationContext';
import { fetchMealIngredients, fetchMealsByIngredient } from '../services/helpers';

const MAX_INGREDIENTS = 11;

function ExploreMealsIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setIngredientExplored } = useContext(ApplicationContext);

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
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          onClick={ async () => {
            const responseAPI = await fetchMealsByIngredient(item.strIngredient);
            setIngredientExplored(responseAPI.meals);
            history.push('/comidas');
          } }
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

export default ExploreMealsIngredients;
