import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ApplicationContext from '../context/ApplicationContext';
import Footer from '../components/Footer';
import Header from '../components/Header';

const MAX_RECIPES = 11;

function DrinksMainScreen() {
  const history = useHistory();
  const { drinksArray } = useContext(ApplicationContext);
  const recipesToRender = drinksArray
    .filter((drink, index) => index <= MAX_RECIPES && drink);
  return (
    <div>
      <Header pageName="Bebidas" />
      {recipesToRender.map((recipe, index) => (
        <button
          type="button"
          key={ recipe.idDrink }
          data-testid={ `${index}-recipe-card` }
          onClick={ ({ target }) => history.push(`/bebidas/${target.name}`) }
        >
          <img
            src={ recipe.strDrinkThumb }
            alt="Drink"
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
        </button>
      ))}
      <Footer />
    </div>
  );
}

export default DrinksMainScreen;
