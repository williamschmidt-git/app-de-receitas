import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ApplicationContext from '../context/ApplicationContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchDrinks } from '../services/helpers';
import ButtonsDrinksSearch from '../components/ButtonsDrinksSearch';

const MAX_RECIPES = 11;

function DrinksMainScreen() {
  const history = useHistory();
  const { drinksArray, setDrinksArray } = useContext(ApplicationContext);
  const recipesToRender = drinksArray
    .filter((drink, index) => index <= MAX_RECIPES && drink);

  const requestAPI = async () => {
    const responseAPI = await fetchDrinks();
    setDrinksArray(responseAPI.drinks);
  };

  useEffect(() => {
    requestAPI();
  }, []);

  return (
    <div>
      <Header pageName="Bebidas" />
      <ButtonsDrinksSearch />
      {recipesToRender.map((recipe, index) => (
        <button
          type="button"
          key={ recipe.idDrink }
          data-testid={ `${index}-recipe-card` }
          onClick={ ({ target }) => history.push(`/bebidas/${target.name}`) }
        >
          <img
            style={ { height: '50px', width: '50px' } }
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
