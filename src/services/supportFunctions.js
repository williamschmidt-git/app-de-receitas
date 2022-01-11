import copy from 'clipboard-copy';
import { arrayOfIngredientsAndMeasurements } from './helpers';

export const getInProgressStoraged = (recipeType, recipeID, targetName) => {
  const stored = localStorage.getItem('inProgressRecipes');
  const parseRecipesInProgress = JSON.parse(stored);
  const progressTypeID = parseRecipesInProgress[recipeType][recipeID];
  if (!progressTypeID) {
    parseRecipesInProgress[recipeType][recipeID] = [targetName];
    return localStorage
      .setItem('inProgressRecipes', JSON.stringify(parseRecipesInProgress));
  }
  if (progressTypeID.includes(targetName)) {
    const ingredientIndex = progressTypeID
      .indexOf(targetName);
    progressTypeID.splice(ingredientIndex, 1);
  } else {
    progressTypeID.push(targetName);
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(parseRecipesInProgress));
};

export const getProgressStored = (ingredient, recipeID, inProgressStored, recipeType) => {
  if (!inProgressStored[recipeType][recipeID]) {
    return false;
  }
  const recipeInProgress = inProgressStored[recipeType][recipeID];
  return recipeInProgress.some((item) => item === ingredient[0]);
};

export const onClipboardClicked = (setClipboardState, URL) => {
  const removeInProgress = URL.split('/').includes('in-progress');
  if (removeInProgress) {
    const positionToslice = 3;
    URL = URL.split('/').slice(0, positionToslice).join('/');
  }
  copy(`http://localhost:3000${URL}`);
  setClipboardState(true);
  const ONDE_SECOND = 1000;
  setTimeout(() => {
    setClipboardState(false);
  }, ONDE_SECOND);
};

export const checkIfThereIsLocalStorage = (storageKey) => {
  const stored = localStorage.getItem(storageKey);
  const parseStorage = JSON.parse(stored);
  if (!parseStorage) {
    return false;
  }
  return parseStorage;
};

const removeRecipe = (favoriteRecipes, addRecipeOnStorage) => {
  const recipeIndex = favoriteRecipes.indexOf(addRecipeOnStorage);
  favoriteRecipes.splice(recipeIndex, 1);
  return favoriteRecipes;
};

// https://pt.stackoverflow.com/questions/329223/armazenar-um-array-de-objetos-em-um-local-storage-com-js
export const saveFavoriteRecipeOnStorage = (recipe, recipeType) => {
  const FAVORITE_RECIPES = 'favoriteRecipes';
  let favoriteRecipes = [];
  let mealOrDrink = 'idMeal';
  if (recipeType === 'bebida') mealOrDrink = 'idDrink';

  if (checkIfThereIsLocalStorage(FAVORITE_RECIPES)) {
    favoriteRecipes = JSON.parse(localStorage.getItem(FAVORITE_RECIPES));
  }

  const addRecipeOnStorage = favoriteRecipes
    .find((recipeOnStorage) => recipeOnStorage.id === recipe[mealOrDrink]);
  if (!addRecipeOnStorage) {
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
  } else {
    removeRecipe(favoriteRecipes, addRecipeOnStorage);
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
};

export const setHeartIcon = (setRecipeToFavorite, id) => {
  const checkLocalStorage = checkIfThereIsLocalStorage('favoriteRecipes');
  if (checkLocalStorage && checkLocalStorage.length !== 0) {
    const parseFavoritedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isRecipeFavorited = parseFavoritedRecipes
      .some((storedAsFavorite) => storedAsFavorite.id === id);
    if (isRecipeFavorited) setRecipeToFavorite(true);
  }
};

export const isButtonFinishDisabled = (
  storedProgress,
  history,
  selectedMeal,
  setButtonToFinish,
) => {
  const splitedPathname = history.location.pathname.split('/');
  let recipeType = splitedPathname[1];
  const id = splitedPathname[2];
  if (recipeType === 'comidas') recipeType = 'meals';
  if (recipeType === 'bebidas') recipeType = 'cocktails';
  if (Object.entries(storedProgress).length !== 0 && storedProgress[recipeType][id]) {
    const numberOfCheckboxes = arrayOfIngredientsAndMeasurements(selectedMeal).length;
    const numberOfChecked = storedProgress[recipeType][id].length;
    if (numberOfCheckboxes === numberOfChecked) {
      setButtonToFinish(false);
    } else {
      setButtonToFinish(true);
    }
  }
};

export const saveDoneRecipeOnStorage = (recipe, recipeType) => {
  const DONE_RECIPES = 'doneRecipes';
  let doneRecipes = [];

  if (checkIfThereIsLocalStorage(DONE_RECIPES)) {
    doneRecipes = JSON.parse(localStorage.getItem(DONE_RECIPES));
  }

  if (recipeType === 'comida') {
    doneRecipes.push({
      id: recipe.idMeal,
      type: recipeType,
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: new Date().toLocaleDateString('pt-br'),
      tags: [recipe.strTags[0], recipe.strTags[1]],
    });
  } else {
    doneRecipes.push({
      id: recipe.idDrink,
      type: recipeType,
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      doneDate: '',
      tags: [],
    });
  }

  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
};

export const unfavoriteButton = (id) => {
  const arrayFromStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  arrayFromStorage.splice(arrayFromStorage.indexOf(id, 0), 1);

  localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFromStorage));
};
