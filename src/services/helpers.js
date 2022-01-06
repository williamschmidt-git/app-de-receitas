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
export const saveOnLocalStorage = (id) => {
  const EM_PROGRESSO = 'em progresso';
  let emProgresso = [];

  if (localStorage.hasOwnProperty(EM_PROGRESSO)) {
    emProgresso = JSON.parse(localStorage.getItem(EM_PROGRESSO));
  }

  emProgresso.push(id);

  localStorage.setItem('em progresso', JSON.stringify(emProgresso));
};

export const saveFavoriteRecipeOnStorage = (recipe) => {
  const FAVORITE_RECIPES = 'favoriteRecipes';
  let favoriteRecipes = [];

  if (localStorage.hasOwnProperty(FAVORITE_RECIPES)) {
    favoriteRecipes = JSON.parse(localStorage.getItem(FAVORITE_RECIPES));
  }

  favoriteRecipes.push({
    id: recipe.idMeal,
    area: recipe.strArea,
    category: recipe.strCategory,
    // alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
    name: recipe.strMeal,
    image: recipe.strMealThumb,
  });

  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
};
// favoriteRecipes:
// [{
//   id: id-da-receita,
//   type: comida-ou-bebida,
//   area: area-da-receita-ou-texto-vazio,
//   category: categoria-da-receita-ou-texto-vazio,
//   alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//   name: nome-da-receita,
//   image: imagem-da-receita
// }]
