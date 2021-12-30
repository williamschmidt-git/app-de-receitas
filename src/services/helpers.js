export const fetchMealsIngredients = async (ingredientes) => {
  const responseAPI = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientes}`)
    .then((response) => response.json());
  return responseAPI;
};

export const fetchMealsName = (nome) => {
  const responseAPI = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`)
    .then((response) => response.json());
  return responseAPI;
};

export const fetchMealsFirstLetter = (primeiraLetra) => {
  const responseAPI = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`)
    .then((response) => response.json());
  return responseAPI;
};

export const fetchDrinksIngredients = (ingredientes) => {
  const responseAPI = fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientes}`)
    .then((response) => response.json());
  return responseAPI;
};

export const fetchDrinksName = (nome) => {
  const responseAPI = fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`)
    .then((response) => response.json());
  return responseAPI;
};

export const fetchDrinksFirstLetter = (primeiraLetra) => {
  const responseAPI = fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`)
    .then((response) => response.json());
  return responseAPI;
};

export const fetchMealsRandom = () => {
  const responseAPI = fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((response) => response.json());
  return responseAPI;
};

export const fetchDrinksRandom = () => {
  const responseAPI = fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((response) => response.json());
  return responseAPI;
};
