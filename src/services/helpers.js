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

export const fetchMeals = () => {
  const responseAPI = fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json());
  return responseAPI;
};

export const fetchDrinks = () => {
  const responseAPI = fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json());
  return responseAPI;
};

export const fetchCategoriesMeals = async () => {
  const responseAPI = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json());
  return responseAPI;
};

export const fetchCategoriesDrinks = async () => {
  const responseAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json());
  return responseAPI;
};

export const fetchByMealCategory = (categoryName) => {
  const responseAPI = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
    .then((response) => response.json());
  return responseAPI;
};

export const fetchByDrinkCategory = (categoryName) => {
  const responseAPI = fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`)
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
