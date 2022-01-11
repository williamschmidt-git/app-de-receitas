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
  const {
    drinksArray,
    setDrinksArray,
    setArrayToRender,
    changeArrayToRender,
    recipesByDrinkCategory,
    exploreByIngredients,
    setIngredientExplored } = useContext(ApplicationContext);
  const recipesToRender = changeArrayToRender
    ? recipesByDrinkCategory.filter((drink, index) => index <= MAX_RECIPES && drink)
    : drinksArray.filter((drink, index) => index <= MAX_RECIPES && drink);

  const requestAPI = async () => {
    const responseAPI = await fetchDrinks();
    setDrinksArray(responseAPI.drinks);
  };

  useEffect(() => {
    if (exploreByIngredients.length === 0) {
      requestAPI();
    } else {
      setDrinksArray(exploreByIngredients);
    }
  }, []);

  useEffect(() => {
    if (recipesByDrinkCategory.length === 0) {
      setArrayToRender(false);
    } else {
      setArrayToRender(true);
    }
  }, [recipesByDrinkCategory]);

  useEffect(() => () => setIngredientExplored([]), []);

  return (
    <div>
      <Header pageName="Bebidas" />
      <ButtonsDrinksSearch />
      <div
        className="card-group div-card"
      >
        {recipesToRender.map((recipe, index) => (

          <div
            className="card"
            key={ recipe.idDrink }
          >
            <button
              className="card text-white bg-danger mb-3"
              type="button"
              data-testid={ `${index}-recipe-card` }
              name={ recipe.idDrink }
              onClick={ ({ target }) => history.push(`/bebidas/${target.name}`) }
            >
              <img
                className="card-img-top"
                src={ recipe.strDrinkThumb }
                name={ recipe.idDrink }
                alt="Drink"
                data-testid={ `${index}-card-img` }
              />
              <div className="card-body">
                <p
                  className="card-text"
                  data-testid={ `${index}-card-name` }
                  name={ recipe.idDrink }
                >
                  {recipe.strDrink}
                </p>
              </div>
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default DrinksMainScreen;
