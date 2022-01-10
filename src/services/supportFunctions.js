import copy from 'clipboard-copy';

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

export const onClipboardClicked = (setClipboardState, id, type) => {
  if (type === 'comida') {
    copy(`http://localhost:3000/comidas/${id}`);
    setClipboardState(true);
    const ONDE_SECOND = 1000;
    setTimeout(() => {
      setClipboardState(false);
    }, ONDE_SECOND);
  }
  if (type === 'bebida') {
    copy(`http://localhost:3000/bebidas/${id}`);
    setClipboardState(true);
    const ONDE_SECOND = 1000;
    setTimeout(() => {
      setClipboardState(false);
    }, ONDE_SECOND);
  }
};

export const checkIfThereIsLocalStorage = (storageKey) => {
  const stored = localStorage.getItem(storageKey);
  const parseStorage = JSON.parse(stored);
  if (!parseStorage) {
    return false;
  }
  return true;
};

// https://pt.stackoverflow.com/questions/329223/armazenar-um-array-de-objetos-em-um-local-storage-com-js
export const saveFavoriteRecipeOnStorage = (recipe, recipeType) => {
  const FAVORITE_RECIPES = 'favoriteRecipes';
  let favoriteRecipes = [];

  if (localStorage[FAVORITE_RECIPES]) {
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

export const unfavoriteButton = (id) => {
  const arrayFromStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  arrayFromStorage.splice(arrayFromStorage.indexOf(id, 0), 1);
  console.log(arrayFromStorage);
  localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFromStorage));
};
