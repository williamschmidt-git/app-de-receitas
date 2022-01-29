/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// eslint-disable-next-line jsx-a11y/click-events-have-key-events
import React, { useState, useEffect } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { fetchDrinks } from '../services/helpers';
import '../styles/carousel.css';

const MAX_DRINKS = 23;

function DrinkCarousel() {
  const [drinks, setDrinks] = useState([]);
  const [indexCarousel, setIndexCarousel] = useState(1);
  const [transformValue, setTransformValue] = useState('translateX(0px)');
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

  // const carouselLogic = (name) => {
  //   const TWO = 2;
  //   const onClickButtonPrevious = (img1 - TWO);
  //   const onClickButtonNext = (img1 + TWO);
  //   const maxLength = drinks.length;
  //   if (name === 'next') {
  //     if (onClickButtonNext === maxLength) {
  //       return setImg1(0);
  //     }
  //     return setImg1(onClickButtonNext);
  //   }
  //   if (name === 'previous') {
  //     const MINUS_TWO = -2;
  //     const LAST_POSITION = 22;
  //     if (img1 + MINUS_TWO === MINUS_TWO) {
  //       return setImg1(LAST_POSITION);
  //     }
  //     return setImg1(onClickButtonPrevious);
  //   }
  // };

  // const teste = () => {
  //   const maxTransformNumber = 190;
  //   if (indexCarousel + 1 > drinks.length - 1) {
  //     return setIndexCarousel(1);
  //   }
  //   setIndexCarousel(indexCarousel + 1);
  //   setTransformValue(`translateX(${indexCarousel * (-maxTransformNumber)}px)`);
  //   console.log(indexCarousel, transformValue);
  // };

  return (
    <div className="carousel-container-all">
      <Carousel className="carousel-container">
        {drinks.map((drink, index) => (
          <Carousel.Item key={ index }>
            <img
              key={ index }
              className="d-block w-100 img-carousel"
              src={ drink.strDrinkThumb }
              alt="Drink"
              data-testid={ `${index}-recomendation-card` }
            />
          </Carousel.Item>
        ))}
      </Carousel>
      {/* <button
        className="btn btn-primary btn-dark-left"
        type="button"
        name="previous"
        onClick={ ({ target }) => teste() }
      >
        {'<'}
      </button> */}
      {/* <div className="carousel"> */}
      {/* <div className="carousel-container"> */}
      {/* {drinks.map((drink, index) => (
        <img
          key={ index }
          className="img-carousel"
          style={ { height: '50px', width: '50px' } }
          src={ drink.strDrinkThumb }
          name={ drink.idDrink }
          alt="Drink"
          data-testid={ `${index}-recomendation-card` }
          onClick={ () => history.push(`/bebidas/${drink.idDrink}`) }
        />
      ))} */}
      {/* {drinks.map((drink, index) => (
        <img
          key={ index }
          className="img-carousel"
          style={ { height: '50px', width: '50px', transform: transformValue } }
          src={ drink.strDrinkThumb }
          name={ drink.idDrink }
          alt="Drink"
          data-testid={ `${index}-recomendation-card` }
          onClick={ () => history.push(`/bebidas/${drink.idDrink}`) }
        />
      ))} */}
      {/* </div> */}
      {/* </div> */}
      {/* <button
        className="btn btn-primary btn-dark-right"
        type="button"
        name="next"
        onClick={ ({ target }) => teste(target) }
      >
        {'>'}
      </button> */}
    </div>
  );
}

export default DrinkCarousel;
