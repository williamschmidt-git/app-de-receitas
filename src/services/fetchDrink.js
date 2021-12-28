export const fetchDrinksIngredients = () => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientes}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

export const fetchDrinksName = () => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

export const fetchDrinksFirstLetter = () => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
};
