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

export const onClipboardClicked = (setClipboardState, URL) => {
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
  return true;
};
