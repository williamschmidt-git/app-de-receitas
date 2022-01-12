import React, { useState, useEffect } from 'react';
import { fetchDrinks } from '../services/helpers';
import '../styles/carousel.css';

const MAX_DRINKS = 5;

function DrinkCarousel() {
  const [drinks, setDrinks] = useState([]);

  const requestAPI = async () => {
    const responseAPI = await fetchDrinks();
    setDrinks(responseAPI.drinks);
  };

  useEffect(() => {
    requestAPI();
  }, []);

  const renderDrinks = drinks.filter((drink, index) => index <= MAX_DRINKS && drink);
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide container"
      data-ride="carousel"
    >
      { renderDrinks.map((drink, index) => (
        <div
          className="carousel-inner"
          key={ drink.idDrink }
        >
          <div className="carousel-item-active">
            <div
              className="image d-block w-100"
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

        </div>
      ))}
      <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Anterior</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Próximo</span>
      </a>
    </div>

  );
}

export default DrinkCarousel;
