/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// eslint-disable-next-line jsx-a11y/click-events-have-key-events
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { fetchMeals } from '../services/helpers';
import '../styles/carousel.css';

const MAX_MEALS = 23;

function MealCarousel() {
  const [meals, setMeals] = useState([]);
  const history = useHistory();

  const requestAPI = async () => {
    const responseAPI = await fetchMeals();
    const filteredDrinks = responseAPI.meals
      .filter((meal, index) => index <= MAX_MEALS && meal);
    setMeals(filteredDrinks);
  };

  useEffect(() => {
    requestAPI();
  }, []);

  return (
    <div className="carousel-container-all">
      <Carousel>
        {meals.map((meal, index) => (
          <Carousel.Item key={ index }>
            <img
              className="d-block w-100 img-carousel"
              src={ meal.strMealThumb }
              alt="Meal"
              datat-testid={ `${index}-recomendation-card` }
              onClick={ () => history.push(`/comidas/${meal.idMeal}`) }
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default MealCarousel;
