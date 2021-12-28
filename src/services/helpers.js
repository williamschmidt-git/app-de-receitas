export const fetchMealsIngredients = (ingredientes) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientes}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

export const fetchMealsName = (nome) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

export const fetchMealsFirstLetter = (primeiraLetra) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

export const fetchDrinksIngredients = (ingredientes) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientes}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

export const fetchDrinksName = (nome) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

export const fetchDrinksFirstLetter = (primeiraLetra) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
};
