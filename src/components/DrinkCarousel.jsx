import React, { useState, useEffect } from 'react';
import { fetchDrinks } from '../services/helpers';
import '../styles/carousel.css';

const MAX_DRINKS = 23;

function DrinkCarousel() {
  const [drinks, setDrinks] = useState([]);
  // const [img1, setImg1] = useState(0);

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

  return (
    <div className="carousel-container">
      <button
        className="btn btn-previous"
        type="button"
        name="previous"
        // onClick={ ({ target }) => carouselLogic(target.name) }
      >
        {'<'}
      </button>
      <div className="carousel-img-container">
        {drinks.map((drink, index) => {
          // if (index === img1 || index === img1 + 1) {
          //   return (
          // <img
          //   className="img-display-view"
          //   key={ index }
          //   style={ { height: '50px', width: '50px' } }
          //   src={ drink.strDrinkThumb }
          //   name={ drink.idDrink }
          //   alt="Drink"
          //   data-testid={ `${index}-recomendation-card` }
          // />
          //   );
          // }
          // return (
          //   <img
          //     className="img-display-none"
          //     key={ index }
          //     style={ { height: '50px', width: '50px' } }
          //     src={ drink.strDrinkThumb }
          //     name={ drink.idDrink }
          //     alt="Drink"
          //     data-testid={ `${index}-recomendation-card` }
          //   />
          // );
          return (
            <img
              // className="img-display-view"
              key={ index }
              style={ { height: '50px', width: '50px' } }
              src={ drink.strDrinkThumb }
              name={ drink.idDrink }
              alt="Drink"
              data-testid={ `${index}-recomendation-card` }
            />
          );
        })}
      </div>
      <button
        className="btn btn-next"
        type="button"
        name="next"
        // onClick={ ({ target }) => carouselLogic(target.name) }
      >
        {'>'}
      </button>
    </div>
  );

  // return (
  //   <div
  //     id="carouselExampleControls"
  //     className="carousel slide container"
  //     data-bs-ride="carousel"
  //   >
  //     { renderDrinks.map((drink, index) => (
  //       <div
  //         className="carousel-inner"
  //         key={ drink.idDrink }
  //       >
  //         <div className="carousel-item-active">
  //           <div
  //             className="image d-block w-100"
  //           >
  //             <img
  //               style={ { height: '50px', width: '50px' } }
  //               src={ drink.strDrinkThumb }
  //               name={ drink.idDrink }
  //               alt="Drink"
  //               data-testid={ `${index}-recomendation-card` }
  //             />
  //           </div>

  //           <div className="info">
  //             <p className="category">
  //               { drink.strAlcoholic }
  //             </p>
  //             <h4 className="name">
  //               { drink.strDrink }
  //             </h4>
  //           </div>

  //         </div>

  //       </div>
  //     ))}
  //     <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
  //       <span className="carousel-control-prev-icon" aria-hidden="true" />
  //       <span className="sr-only">Anterior</span>
  //     </a>
  //     <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
  //       <span className="carousel-control-next-icon" aria-hidden="true" />
  //       <span className="sr-only">Próximo</span>
  //     </a>
  //   </div>

  // );
}

export default DrinkCarousel;
