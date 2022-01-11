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

export const fetchMealsArea = () => {
  const responseAPI = fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((response) => response.json());
  return responseAPI;
};

export const fetchMealIngredients = () => {
  const responseAPI = fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((response) => response.json());
  return responseAPI;
};

export const fetchDrinkIngredients = () => {
  const responseAPI = fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
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

export const fetchMealId = (idMeal) => {
  const responseAPI = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then((response) => response.json());
  return responseAPI;
};

export const fetchDrinkId = (idDrink) => {
  const responseAPI = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
    .then((response) => response.json());
  return responseAPI;
};

export const fetchDrinksByIngredient = (drinkName) => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
  const responseAPI = fetch(`${URL}${drinkName}`)
    .then((response) => response.json());
  return responseAPI;
};

export const fetchMealsByIngredient = (mealName) => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
  const responseAPI = fetch(`${URL}${mealName}`)
    .then((response) => response.json());
  return responseAPI;
};

export const fetchByArea = (areaName) => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
  const responseAPI = fetch(`${URL}${areaName}`)
    .then((response) => response.json());
  return responseAPI;
};

export const arrayOfIngredientsAndMeasurements = (selectedRecipe) => {
  const ingredientsArray = Object.entries(selectedRecipe)
    .filter((keyName) => keyName[0].includes('strIngredient'))
    .filter((ingredient) => !ingredient.includes(null))
    .filter((ingredient) => !ingredient.includes(''))
    .filter((ingredient) => !ingredient.includes(' '))
    .map((e) => e.splice(1, 1));

  const measureArray = Object.entries(selectedRecipe)
    .filter((keyName) => keyName[0].includes('strMeasure'))
    .filter((ingredient) => !ingredient.includes(null))
    .filter((ingredient) => !ingredient.includes(''))
    .filter((ingredient) => !ingredient.includes(' '))
    .map((e) => e.splice(1, 1));

  return ingredientsArray
    .reduce((acc, curr, index) => {
      acc.push(curr.concat(measureArray[index]));
      return acc;
    }, []);
};

// https://pt.stackoverflow.com/questions/329223/armazenar-um-array-de-objetos-em-um-local-storage-com-js

export const saveFavoriteRecipeOnStorage = (recipe, recipeType) => {
  const FAVORITE_RECIPES = 'favoriteRecipes';
  let favoriteRecipes = [];

  if (localStorage.FAVORITE_RECIPES) {
    favoriteRecipes = JSON.parse(localStorage.getItem(FAVORITE_RECIPES));
  }

  if (recipeType === 'comida') {
    favoriteRecipes.push({
      id: recipe.idMeal,
      type: recipeType,
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    });
  } else {
    favoriteRecipes.push({
      id: recipe.idDrink,
      type: recipeType,
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    });
  }

  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
};
