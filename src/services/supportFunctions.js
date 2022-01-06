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
  if (inProgressStored[recipeType][recipeID]) {
    const mealsInProgress = inProgressStored[recipeType][recipeID];
    return mealsInProgress.some((item) => item === ingredient[0]);
  }
};
