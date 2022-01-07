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

// https://pt.stackoverflow.com/questions/329223/armazenar-um-array-de-objetos-em-um-local-storage-com-js
export const saveFavoriteRecipeOnStorage = (recipe, recipeType) => {
  const FAVORITE_RECIPES = 'favoriteRecipes';
  let favoriteRecipes = [];

  if (localStorage.hasOwnProperty(FAVORITE_RECIPES)) {
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
