import React, { useState, useEffect } from 'react';
import { fetchMeals } from '../services/helpers';
import '../App.css';

const MAX_MEALS = 5;

function DrinkCarousel() {
  const [meals, setMeals] = useState([]);

  const requestAPI = async () => {
    const responseAPI = await fetchMeals();
    setMeals(responseAPI.meals);
  };

  useEffect(() => {
    requestAPI();
  }, []);

  const renderMeals = meals.filter((meal, index) => index <= MAX_MEALS && meal);
  return (
    <div className="container">
      { renderMeals.map((meal, index) => (
        <div
          key={ meal.idMeal }
          className="carousel"
        >
          <div className="image">
            <img
              style={ { height: '50px', width: '50px' } }
              src={ meal.strMealThumb }
              name={ meal.idMeal }
              alt="Meal"
              data-testid={ `${index}-recomendation-card` }
            />
          </div>
          <div className="info">
            <p className="category">
              { meal.strCategory }
            </p>
            <h4 className="name">
              { meal.strMeal }
            </h4>
          </div>
        </div>
      ))}
    </div>

  );
}

export default DrinkCarousel;
