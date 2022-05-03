/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// eslint-disable-next-line jsx-a11y/click-events-have-key-events
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { fetchDrinks } from '../services/helpers';
import '../styles/carousel.css';

const MAX_DRINKS = 23;

function DrinkCarousel() {
  const [drinks, setDrinks] = useState([]);
  const history = useHistory();

  const requestAPI = async () => {
    const responseAPI = await fetchDrinks();
    const filteredDrinks = responseAPI.drinks
      .filter((drink, index) => index <= MAX_DRINKS && drink);
    setDrinks(filteredDrinks);
  };

  useEffect(() => {
    requestAPI();
  }, []);

  return (
    <div className="carousel-container-all">
      <Carousel>
        {drinks.map((drink, index) => (
          <Carousel.Item key={ index }>
            <img
              className="d-block w-100 img-carousel"
              src={ drink.strDrinkThumb }
              alt="Drink"
              data-testid={ `${index}-recomendation-card` }
              onClick={ () => history.push(`/bebidas/${drink.idDrink}`) }
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default DrinkCarousel;
