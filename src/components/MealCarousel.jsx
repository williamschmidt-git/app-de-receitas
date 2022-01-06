import React, { useState, useEffect } from 'react';
import { fetchDrinks } from '../services/helpers';
import '../App.css';

const MAX_DRINKS = 5;

function MealCarousel() {
  const [drinks, setDrinks] = useState([]);

  const requestAPI = async () => {
    const responseAPI = await fetchDrinks();
    setDrinks(responseAPI.drinks);
  };

  useEffect(() => {
    requestAPI();
  }, []);

  console.log(drinks);

  const renderDrinks = drinks.filter((drink, index) => index <= MAX_DRINKS && drink);
  return (
    <div className="container">
      { renderDrinks.map((drink, index) => (
        <div
          className="carousel"
          key={ drink.idDrink }
        >
          <div
            className="image"
          >
            <img
              style={ { height: '50px', width: '50px' } }
              src={ drink.strDrinkThumb }
              name={ drink.idDrink }
              alt="Drink"
              data-testid={ `${index}-recomendation-card` }
            />
          </div>
          <div className="info">
            <p className="category">
              { drink.strAlcoholic }
            </p>
            <h4 className="name">
              { drink.strDrink }
            </h4>
          </div>
        </div>
      ))}
    </div>

  );
}

export default MealCarousel;
